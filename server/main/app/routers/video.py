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


@router.get("/api/video/page/{count}", tags=["video"], description="[filter] 동영상 12개씩 리스트로 보기 (알고리즘으로 보는경우 : algorithm_tag_id와 language_tag_id 지정, 과목으로 보는경우 : subject_tag_id 지정)")
def get_video_filter_page(
    count: int,
    algorithm_tag_id: Optional[int] = 0,
    language_tag_id: Optional[int] = 0,
    subject_tag_id: Optional[int] = 0,
    user_id: Optional[int] = 0,
    db: Session = Depends(get_db),
):
    if algorithm_tag_id:
        if language_tag_id:
            v_data = (
                db.query(models.AlgorithmUserTag)
                .join(models.Video, models.AlgorithmUserTag.video_id == models.Video.id)
                .filter(models.AlgorithmUserTag.algorithm_tag_id == algorithm_tag_id)
                .filter(models.Video.language_tag_id == language_tag_id)
                .offset(count * 12)
                .limit(12)
                .all()
            )

            for i in range(len(v_data)):
                v_data[i].video
                v_data[i].video.user
                if v_data[i].video.user.password: del v_data[i].video.user.password
                if v_data[i].video.user.active: del v_data[i].video.user.active
                if v_data[i].video.user.security_count == None: del v_data[i].video.user.security_count
                if v_data[i].video.user.join_date: del v_data[i].video.user.join_date
                del v_data[i].video_id
                del v_data[i].algorithm_tag_id
                del v_data[i].id
                v_data[i].likecnt = len(v_data[i].like)
                del v_data[i].like
        else:
            v_data = (
                db.query(models.AlgorithmUserTag)
                .join(models.Video, models.AlgorithmUserTag.video_id == models.Video.id)
                .filter(models.AlgorithmUserTag.algorithm_tag_id == algorithm_tag_id)
                .offset(count * 12)
                .limit(12)
                .all()
            )

            for i in range(len(v_data)):
                v_data[i].video
                v_data[i].video.user
                if v_data[i].video.user.password: del v_data[i].video.user.password
                if v_data[i].video.user.active: del v_data[i].video.user.active
                if v_data[i].video.user.security_count == None: del v_data[i].video.user.security_count
                if v_data[i].video.user.join_date: del v_data[i].video.user.join_date
                del v_data[i].video_id
                del v_data[i].algorithm_tag_id
                del v_data[i].id
                v_data[i].likecnt = len(v_data[i].like)
                del v_data[i].like

    elif subject_tag_id:
        v_data = (
            db.query(models.SubjectUserTag)
            .join(models.Video, models.SubjectUserTag.video_id == models.Video.id)
            .filter(models.SubjectUserTag.subject_tag_id == subject_tag_id)
            .offset(count * 12)
            .limit(12)
            .all()
        )

        for i in range(len(v_data)):
            v_data[i].video
            if v_data[i].video.user.password: del v_data[i].video.user.password
            if v_data[i].video.user.active: del v_data[i].video.user.active
            if v_data[i].video.user.security_count == None: del v_data[i].video.user.security_count
            if v_data[i].video.user.join_date: del v_data[i].video.user.join_date
            del v_data[i].video_id
            del v_data[i].subject_tag_id
            del v_data[i].id
            v_data[i].likecnt = len(v_data[i].like)
            del v_data[i].like
    else:
        v_data = (
            db.query(models.Video)
            .offset(count * 12)
            .limit(12)
            .all()
        )
        for i in range(len(v_data)):
            v_data[i].subject_user_tag
            v_data[i].algorithm_user_tag
            v_data[i].user
            if v_data[i].user.password: del v_data[i].user.password
            if v_data[i].user.active: del v_data[i].user.active
            if v_data[i].user.security_count == None: del v_data[i].user.security_count
            if v_data[i].user.join_date: del v_data[i].user.join_date

            del v_data[i].content
            del v_data[i].created_date
            del v_data[i].updated_date
            v_data[i].likecnt = len(v_data[i].like)
            del v_data[i].like
    # if user_id:
    current_user_like_video = (
        db.query(models.Like.video_id)
        .filter(models.Like.user_id == user_id)
        .all()
    )
    like_video_set = set()
    for item in current_user_like_video:
        like_video_set.add(item.video_id)
    print(like_video_set)
    for i in range(len(v_data)):
        if v_data[i].id in like_video_set:
            v_data[i].likestatus = True
        else:
            v_data[i].likestatus = False
    return {"data": v_data, "page_cnt": len(v_data)//12 + 1}

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


@router.post("/api/video/{video_id}", tags=["video"], description="동영상 좋아요/취소")
def video_like(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    if not current_user:
        raise HTTPException(status_code=401, detail="Not Allowed. Please Login")
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if not v_data:
        raise HTTPException(status_code=404, detail="No Content")
    current_video_like_data = db.query(models.Like).filter(models.Like.user_id == current_user.id).filter(models.Like.video_id == v_data.id).first()

    if not current_video_like_data:
        vl_data = models.Like(
            user_id=current_user.id,
            video_id=v_data.id,
        )
        db.add(vl_data)
        db.commit()
        db.refresh(vl_data)
        like_status = True
    else:
        db.delete(current_video_like_data)
        db.commit()
        like_status = False

    like_cnt = len(v_data.like)
    del v_data.like
    return {"data": v_data, "like_cnt": like_cnt, "like_status": like_status}