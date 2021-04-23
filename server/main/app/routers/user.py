# 표준 라이브러리
from datetime import datetime, timedelta
from os import path, getenv
from sys import path as pth
from typing import Optional

# 서드 파티 라이브러리
from dotenv import load_dotenv
from fastapi import APIRouter, BackgroundTasks, Depends, Form, HTTPException, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
import yagmail

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db


router = APIRouter()


# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


load_dotenv(verbose=True)
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")
SENDER = getenv("SENDER")
PW = getenv("PW")

ACCESS_TOKEN_EXPIRE_MINUTES = 120

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_current_user(token: str, db):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        expired_time: int = payload.get("exp")
        current_time = datetime.timestamp(datetime.utcnow())
        if expired_time < current_time:
            raise credentials_exception
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    current_user = db.query(models.User).filter(models.User.email == email).first()
    if current_user is None:
        raise credentials_exception
    return current_user


def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/api/signup", tags=["user"], description="회원가입")
async def signup(
    data: schemas.UserBase,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    validate_email(data.email)
    check_duplicate_email(data.email, db)
    background_tasks.add_task(confirm_email, to_email=data.email)
    u_data = models.User(
        email=data.email, password=get_password_hash(data.password), name=data.name
    )
    db.add(u_data)
    db.commit()
    db.refresh(u_data)
    return {"data": u_data}


@router.post("/api/login", tags=["user"], description="로그인")
def login(data: schemas.LoginBase, db: Session = Depends(get_db)):
    current_user = db.query(models.User).filter(models.User.email == data.email).first()
    validate_email(data.email)
    if not current_user.active:
        raise HTTPException(status_code=401, detail="이메일 인증을 먼저 진행해 주세요.")
    if verify_password(data.password, current_user.password):
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        jwt_token = create_access_token(
            data={"sub": current_user.email}, expires_delta=access_token_expires
        )
        return_user = {
            "id": current_user.id,
            "email": current_user.email,
            "name": current_user.name,
            "profile": current_user.profile,
        }
        return {"user": return_user, "token": jwt_token}
    raise HTTPException(status_code=401, detail="유저가 유효하지 않습니다.")


@router.get("/api/emailcheck/{email}", tags=["user"], description="이메일 가입 중복 체크")
def check_duplicate_email(email: str, db: Session = Depends(get_db)):
    e_mail = db.query(models.User).filter(models.User.email == email).first()
    if e_mail:
        raise HTTPException(status_code=400, detail="유저가 이미 존재합니다.")
    return {"data": email}


def confirm_email(to_email: str):
    pw = jwt.decode(PW, SECRET_KEY, algorithms=[ALGORITHM])["pw"]
    yag = yagmail.SMTP(SENDER, pw)
    to = to_email
    subject = "CODE:RUN 이메일 인증"
    body = ""
    html = f"""
    <h1>안녕하세요 CODE:RUN입니다.</h1>
    <h3>회원가입을 진행하려면 밑의 버튼을 눌러주세요</h3>
    <a href="https://k4d102.p.ssafy.io/api/emailconfirm/redirect/{to_email}"> 이메일 인증 </a>
    """
    img = ""
    yag.send(to=to, subject=subject, contents=[body, html, img])
    return {"send": "success"}


def validate_email(email: str):
    if '@' not in email or '.' not in email:
        raise HTTPException(status_code=422, detail="이메일 형식이 아닙니다.")
    try:
        email.split('@')[1].split('.')[0][0]
    except:
        raise HTTPException(status_code=422, detail="이메일 형식이 아닙니다.")
    try:
        email.split('@')[1].split('.')[1][0]
    except:
        raise HTTPException(status_code=422, detail="이메일 형식이 아닙니다.")
    return


@router.get(
    "/api/emailconfirm/redirect/{email}", tags=["user"], description="확인 후 페이지 리다이렉트"
)
def redirect_site(email: str, db: Session = Depends(get_db)):
    u_data = db.query(models.User).filter(models.User.email == email).first()
    if u_data:
        u_data.active = True
        db.commit()
        return RedirectResponse("https://k4d102.p.ssafy.io/account/success")
    return RedirectResponse("https://k4d102.p.ssafy.io/account/fail")