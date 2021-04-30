# 표준 라이브러리
from os import path, remove, system
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Header
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()
parent_route = path.dirname(path.abspath(path.dirname(__file__)))


@router.get("/video/{video_id}", tags=["video"], description="비디오 불러오기")
def get_video(video_id: int):
    try:
        video = open(f"{parent_route}/videos/VIDEO_{video_id}.m3u8", mode="rb")
    except:
        raise HTTPException(status_code=404, detail="No content")
    return StreamingResponse(video, media_type="vnd.apple.mpegURL")


@router.post(
    "/video/create/{video_id}/{file_extension}", tags=["video"], description="비디오 업로드"
)
def create_video(
    video_id: int,
    file_extension: str,
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
    with open(f"{parent_route}/videos/VIDEO_{video_id}.{file_extension}", "wb") as f:
        f.write(file)
    
    # 여기에 인코딩 작업 해주기.
    system(f"{parent_route}/ffmpeg -i videos/VIDEO_{video_id}.{file_extension} -b:v 1M -g 60 -hls_time 2 -hls_list_size 0 -hls_segment_size 1000000 videos/VIDEO_{video_id}.m3u8")

    # 이거 마지막에 해주면 되고,
    remove(f"{parent_route}/videos/VIDEO_{video_id}.{file_extension}")
    return {"data": "success"}


@router.delete("/video/delete/{video_id}", tags=["video"], description="비디오 삭제")
def delete_video(
    video_id: int,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    v_data = db.query(models.Video).filter(models.Video.id == video_id).first()
    if v_data.user_id != current_user.id:
        raise HTTPException(status_code=401, detail="Incorrect user")
    try:
        remove(f"{parent_route}/videos/VIDEO_{video_id}.m3u8")
    except:
        raise HTTPException(status_code=404, detail="No content")
    try:
        i = 0
        while True:
            remove(f"{parent_route}/videos/VIDEO_{video_id}{i}.ts")
            i += 1
    except:
        return {"delete": video_id}
