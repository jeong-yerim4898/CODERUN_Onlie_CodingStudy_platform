# 표준 라이브러리
from datetime import datetime, timedelta
from os import path, getenv
from sys import path as pth
from typing import Optional

# 서드 파티 라이브러리
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db


router = APIRouter()