# 표준 라이브러리
from os import path
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()


@router.post("/api/video", tags=["video"], description="동영상 게시물 작성")
def post_video(
    data: schemas.VideoBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = models.Video(
        user_id=current_user.id,
        title=data.title,
        content=data.content,
        language_tag_id=data.language_tag_id,
        subject_user_tag_id=data.subject_user_tag_id,
    )
    db.add(v_data)
    db.commit()
    db.refresh(v_data)
    return {"data": v_data}


@router.post("/api/video/comment", tags=["video"], description="동영상 댓글 작성")
def post_video_comment(
    data: schemas.VideoCommentBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vc_data = models.VideoComment(
        user_id=current_user.id,
        video_id=data.video_id,
        content=data.content
    )
    db.add(vc_data)
    db.commit()
    db.refresh(vc_data)
    return {"data": vc_data}