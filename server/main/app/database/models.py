# 표준 라이브러리
import time

# 서드 파티 라이브러리
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

# 로컬
from .database import Base


# 데이터 목록
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(320), unique=True, index=True, nullable=False)
    name = Column(String(20), index=True, nullable=False)
    profile = Column(String(256))
    password = Column(String(64), nullable=False)
    join_date = Column(DateTime(timezone=True), server_default=func.now())