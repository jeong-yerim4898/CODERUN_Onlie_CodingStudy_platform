# 표준 라이브러리
from datetime import datetime, timedelta
from os import path, getenv
from sys import path as pth
from typing import Optional

# 서드 파티 라이브러리
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, Form, HTTPException, Header
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db


router = APIRouter()


# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


load_dotenv(verbose=True)
SECRET_KEY = getenv("SECRET_KEY")
ALGORITHM = getenv("ALGORITHM")

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
        token_data = schemas.TokenData(email=email)
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
def signup(data: schemas.UserBase, db: Session = Depends(get_db)):
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
    else:
        raise HTTPException(status_code=401, detail="유저가 유효하지 않습니다.")


@router.get("/api/emailcheck/{email}", tags=["user"], description="이메일 가입 중복 체크")
def check_email(email: str, db: Session = Depends(get_db)):
    e_mail = db.query(models.User).filter(models.User.email == email).first()
    if e_mail:
        raise HTTPException(status_code=400, detail="이메일이 존재합니다.")
    return {"data": email}