# 표준 라이브러리
from os import path, remove
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Header
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()
parent_route = path.dirname(path.abspath(path.dirname(__file__)))


@router.get("/image/profile/{user_id}", tags=["profile"], description="프로필 불러오기")
def get_profile(
    user_id: int,
    db: Session = Depends(get_db),
):
    try:
        open(f"{parent_route}/assets/profile/profile_{user_id}.png")
        return FileResponse(f"{parent_route}/assets/profile/profile_{user_id}.png")
    except:
        raise HTTPException(status_code=404, detail="No content")


@router.post("/image/profile/create/{user_id}", tags=["profile"], description="프로필 저장")
def create_profile(
    user_id: int,
    file: bytes = File(...),
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    if current_user.id != user_id:
        raise HTTPException(status_code=401, detail="Incorrect user")
    with open(f"{parent_route}/assets/profile/profile_{user_id}.png", "wb") as f:
        f.write(file)
    u_data = db.query(models.User).filter(models.User.id == user_id).first()
    u_data.profile = f"https://k4d102.p.ssafy.io/image/profile/{user_id}"
    db.commit()
    return FileResponse(f"{parent_route}/assets/profile/profile_{user_id}.png")


@router.delete("/image/profile/delete/{user_id}", tags=["profile"], description="프로필 삭제")
def delete_profile(
    user_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    if current_user.id != user_id:
        raise HTTPException(status_code=401, detail="Incorrect user")
    try:
        remove(f"{parent_route}/assets/profile/profile_{user_id}.png")
        u_data = db.query(models.User).filter(models.User.id == user_id).first()
        u_data.profile = None
        db.commit()
        return {"delete": user_id}
    except:
        raise HTTPException(status_code=404, detail="No content")