# 표준 라이브러리
from os import path
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException, Header, Form
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()


@router.get("/api/videolist", tags=["video list"], description="비디오리스트 확인")
def get_video_list(
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    videolist = db.query(models.VideoList).filter(models.VideoList.user_id == current_user.id).all()
    return {"data": videolist}


@router.post("/api/videolist/create", tags=["video list"], description="비디오리스트 생성")
def create_video_list(
    title: str = Form(...),
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vl_data = models.VideoList(
        user_id=current_user.id,
        title=title
    )
    db.add(vl_data)
    db.commit()
    db.refresh(vl_data)
    return {"data": vl_data}


@router.put("/api/videolist/update", tags=["video list"], description="비디오리스트 타이틀 수정")
def update_video_list(
    id: int = Form(...),
    title: str = Form(...),
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vl_data = (
        db.query(models.VideoList)
        .filter(models.VideoList.id == id)
        .first()
    )
    if current_user.id != vl_data.user_id:
        raise HTTPException(status_code=401, detail="유저가 유효하지 않습니다.")
    vl_data.title = title
    db.commit()
    db.refresh(vl_data)
    return {"data": vl_data}


@router.delete("/api/videolist/delete/{id}", tags=["video list"], description="비디오리스트 삭제")
def delete_video_list(
    id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    vl_data = (
        db.query(models.VideoList)
        .filter(models.VideoList.id == id)
        .first()
    )
    if not vl_data:
        raise HTTPException(status_code=404, detail="데이터가 존재하지 않습니다.")
    if current_user.id != vl_data.user_id:
        raise HTTPException(status_code=401, detail="유저가 유효하지 않습니다.")
    db.delete(vl_data)
    db.commit()
    return {"delete": id}