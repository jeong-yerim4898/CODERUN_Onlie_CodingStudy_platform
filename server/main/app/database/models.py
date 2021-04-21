# 표준 라이브러리
import time

# 서드 파티 라이브러리
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date, Float, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

# 로컬
from .database import Base


# 유저
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(320), unique=True, index=True, nullable=False)
    name = Column(String(20), index=True, nullable=False)
    profile = Column(String(256))
    password = Column(String(64), nullable=False)
    join_date = Column(DateTime(timezone=True), server_default=func.now())

    video = relationship("Video", backref="user", passive_deletes=True)
    video_comment = relationship("VideoComment", backref="user", passive_deletes=True)


# 동영상 게시물
class Video(Base):
    __tablename__ = "video"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'))
    title = Column(String(100), index=True, nullable=False)
    content = Column(Text)
    language_tag_id = Column(Integer)
    subject_user_tag_id = Column(Integer)
    created_date = Column(DateTime(timezone=True), server_default=func.now())
    updated_date = Column(DateTime(timezone=True), server_default=func.now(), server_onupdate=func.now())

    video_comment = relationship("VideoComment", backref="video", passive_deletes=True)

# 동영상 댓글
class VideoComment(Base):
    __tablename__ = "video_comment"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id", ondelete='CASCADE'))
    video_id = Column(Integer, ForeignKey("video.id", ondelete='CASCADE'))
    content = Column(Text)
    created_date = Column(DateTime(timezone=True), server_default=func.now())
    updated_date = Column(DateTime(timezone=True), server_default=func.now(), server_onupdate=func.now())