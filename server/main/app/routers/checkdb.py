# 표준 라이브러리
from os import path
from sys import path as pth

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models
from dependency import get_db


router = APIRouter()


@router.get("/api/check/{table}", tags=["check"], description="테이블 확인")
def get_video_detail(
    table: str,
    db: Session = Depends(get_db),
):
    if table == "user":
        return {"data": db.query(models.User).all()}
    if table == "video":
        return {"data": db.query(models.Video).all()}
    if table == "video_comment":
        return {"data": db.query(models.VideoComment).all()}
    if table == "like":
        return {"data": db.query(models.Like).all()}
    if table == "video_list":
        return {"data": db.query(models.VideoList).all()}
    if table == "video_list_data":
        return {"data": db.query(models.VideoListData).all()}
    if table == "language_tag":
        return {"data": db.query(models.LanguageTag).all()}
    if table == "subject_tag":
        return {"data": db.query(models.SubjectTag).all()}
    if table == "subject_user_tag":
        return {"data": db.query(models.SubjectUserTag).all()}
    if table == "board":
        return {"data": db.query(models.board).all()}
    if table == "board_comment":
        return {"data": db.query(models.BoardComment).all()}

    raise HTTPException(status_code=400, detail="해당 테이블이 없습니다.")