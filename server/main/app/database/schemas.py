# 서드 파티 라이브러리
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Date, DateTime


# 데이터 목록 베이스
class UserBase(BaseModel):
    email: str
    password: str
    name: str


class LoginBase(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class VideoBase(BaseModel):
    title: str
    content: Optional[str] = None
    language_tag_id: Optional[int] = None
    subject_user_tag_id: Optional[int] = None

class VideoCommentBase(BaseModel):
    video_id: int
    content: str