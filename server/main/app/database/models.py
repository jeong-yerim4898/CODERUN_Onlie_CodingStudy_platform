# 표준 라이브러리
import time

# 서드 파티 라이브러리
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Date, Float, DateTime
from sqlalchemy.orm import relationship

# 로컬
from .database import Base


# 데이터 목록
class DataList(Base):
    __tablename__ = "data_list"

    data_list_id = Column(Integer, primary_key=True, index=True)
    data_list_type = Column(String(15), index=True)
    data_list_name = Column(String(20), unique=True, index=True)
    data_list_url = Column(String(200), index=True)
    stock_code = Column(String(10), unique=True, index=True)

    data_sets = relationship("DataSet", back_populates="data_list_own")
    user_data_sets = relationship("UserDataSet", back_populates="data_list_own")