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


@router.get("/image/thumbnail/{video_id}", tags=["thumbnail"], description="썸네일 불러오기")
def get_thumbnail(
    video_id: int,
    db: Session = Depends(get_db),
):
    try:
        open(f"{parent_route}/assets/thumbnail/thumbnail_{video_id}.png")
        return FileResponse(f"{parent_route}/assets/thumbnail/thumbnail_{video_id}.png")
    except:
        raise HTTPException(status_code=404, detail="No content")


@router.post("/image/thumbnail/create/{video_id}", tags=["thumbnail"], description="썸네일 저장")
def create_thumbnail(
    video_id: int,
    file: bytes = File(...),
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise HTTPException(status_code=404, detail="No content")
    if v_data.user_id != current_user.id:
        raise HTTPException(status_code=401, detail="Incorrect user")
    with open(f"{parent_route}/assets/thumbnail/thumbnail_{video_id}.png", "wb") as f:
        f.write(file)
    v_data.thumbnail = f"https://k4d102.p.ssafy.io/image/thumbnail/{video_id}"
    db.commit()
    return FileResponse(f"{parent_route}/assets/thumbnail/thumbnail_{video_id}.png")


@router.delete("/image/thumbnail/delete/{video_id}", tags=["thumbnail"], description="썸네일 삭제")
def delete_thumbnail(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise HTTPException(status_code=404, detail="No content")
    if current_user.id != v_data.user_id:
        raise HTTPException(status_code=401, detail="Incorrect user")
    try:
        remove(f"{parent_route}/assets/thumbnail/thumbnail_{video_id}.png")
        v_data.thumbnail = None
        db.commit()
        return {"delete": video_id}
    except:
        raise HTTPException(status_code=404, detail="No content")