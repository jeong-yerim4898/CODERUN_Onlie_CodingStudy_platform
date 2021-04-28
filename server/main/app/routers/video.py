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


@router.get("/api/video/detail/{video_id}", tags=["video"], description="동영상 디테일 보기")
def get_video_detail(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise HTTPException(status_code=404, detail="No content")
    v_data.subject_user_tag
    v_data.algorithm_user_tag
    return {"data": v_data}


@router.get("/api/video/page/{count}", tags=["video"], description="동영상 12개씩 리스트로 보기")
def get_video_page(
    count: int,
    db: Session = Depends(get_db),
):
    v_data = (
        db.query(models.Video)
        .offset(count * 12)
        .limit(12)
        .all()
    )
    for i in range(len(v_data)):
        v_data[i].subject_user_tag
        v_data[i].algorithm_user_tag
        del v_data[i].content
        del v_data[i].created_date
        del v_data[i].updated_date
    
    if not v_data:
        raise HTTPException(status_code=404, detail="No content")
    return {"data": v_data}


@router.post("/api/video/create", tags=["video"], description="동영상 게시물 작성")
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
    )
    db.add(v_data)
    db.commit()
    db.refresh(v_data)
    try:
        for i in data.algorithm_tag_ids:
            sut_data = models.AlgorithmUserTag(video_id=v_data.id, algorithm_tag_id=i)
            db.add(sut_data)
        for i in data.subject_tag_ids:
            aut_data = models.SubjectUserTag(video_id=v_data.id, subject_tag_id=i)
            db.add(aut_data)
        v_data.thumbnail = f"https://k4d102.p.ssafy.io/image/thumbnail/{v_data.id}"
        db.commit()
        db.refresh(v_data)
        v_data.subject_user_tag
        v_data.algorithm_user_tag
        return {"data": v_data}
    except:
        db.delete(v_data)
        db.commit()
    raise HTTPException(status_code=422, detail="Unprocessable entity")


@router.put("/api/video/update", tags=["video"], description="동영상 게시물 수정")
def update_video(
    data: schemas.VideoUpdateBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == data.video_id).first()
    if not v_data:
        raise HTTPException(status_code=404, detail="No content")
    if current_user.id != v_data.user_id:
        raise HTTPException(status_code=401, detail="Incorrect user")
    v_data.title = data.title
    v_data.content = data.content
    v_data.language_tag_id = data.language_tag_id
    try:
        v_data.subject_user_tag = []
        v_data.algorithm_user_tag = []
        for i in data.algorithm_tag_ids:
            sut_data = models.AlgorithmUserTag(video_id=v_data.id, algorithm_tag_id=i)
            db.add(sut_data)
        for i in data.subject_tag_ids:
            aut_data = models.SubjectUserTag(video_id=v_data.id, subject_tag_id=i)
            db.add(aut_data)
        db.commit()
        db.refresh(v_data)
        v_data.subject_user_tag
        v_data.algorithm_user_tag
        return {"data": v_data}
    except:
        raise HTTPException(status_code=422, detail="Unprocessable entity")


@router.delete("/api/video/delete/{video_id}", tags=["video"], description="동영상 게시물 삭제")
def delete_video(
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
    db.delete(v_data)
    db.commit()
    return {"delete": video_id}


def check_video(id, db):
    check = db.query(models.Video).filter(models.Video.id == id).first()
    if not check:
        raise HTTPException(status_code=404, detail="No content")


@router.get("/api/video/comment/{video_id}", tags=["video"], description="동영상 댓글 보기")
def get_video_comment(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    get_current_user(token, db)
    vc_data = (
        db.query(models.VideoComment)
        .filter(models.VideoComment.video_id == video_id)
        .all()
    )
    return {"data": vc_data}


@router.post("/api/video/comment/create", tags=["video"], description="동영상 댓글 작성")
def post_video_comment(
    data: schemas.VideoCommentBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    check_video(data.video_id, db)
    vc_data = models.VideoComment(
        user_id=current_user.id, video_id=data.video_id, content=data.content
    )
    db.add(vc_data)
    db.commit()
    db.refresh(vc_data)
    return {"data": vc_data}


@router.put("/api/video/comment/update", tags=["video"], description="동영상 댓글 수정")
def update_video_comment(
    data: schemas.VideoCommentUpdateBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vc_data = (
        db.query(models.VideoComment)
        .filter(models.VideoComment.id == data.video_comment_id)
        .first()
    )
    if not vc_data:
        raise HTTPException(status_code=404, detail="No content")
    if current_user.id != vc_data.user_id:
        raise HTTPException(status_code=401, detail="Incorrect user")
    vc_data.content = data.content
    db.commit()
    db.refresh(vc_data)
    return {"data": vc_data}


@router.delete(
    "/api/video/comment/delete/{video_comment_id}",
    tags=["video"],
    description="동영상 댓글 삭제",
)
def delete_video_comment(
    video_comment_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vc_data = (
        db.query(models.VideoComment)
        .filter(models.VideoComment.id == video_comment_id)
        .first()
    )
    if not vc_data:
        raise HTTPException(status_code=404, detail="No content")
    if current_user.id != vc_data.user_id:
        raise HTTPException(status_code=401, detail="Incorrect user")
    db.delete(vc_data)
    db.commit()
    return {"delete": video_comment_id}