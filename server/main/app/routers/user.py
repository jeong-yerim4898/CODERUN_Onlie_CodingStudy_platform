# 표준 라이브러리
from os import path
from sys import path as pth
from typing import Optional

# 서드 파티 라이브러리
from fastapi import APIRouter, Depends, Form

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/signup", tags=["user"], description="회원가입")
def signup(data: schemas.UserBase, db: Session = Depends(get_db)):
    
    return {"data": data}