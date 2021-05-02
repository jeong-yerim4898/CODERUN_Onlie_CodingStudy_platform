# 표준 라이브러리
from os import path, remove, system
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile, HTTPException, Header
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()
parent_route = path.dirname(path.abspath(path.dirname(__file__)))


# 확인 프로세스 만들기