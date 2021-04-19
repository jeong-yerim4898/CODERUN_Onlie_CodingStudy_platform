# 서드 파티 라이브러리
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Date, DateTime


# 데이터 목록 베이스
class DataListBase(BaseModel):
    data_list_type: str
    data_list_name: str
    data_list_url: str
    stock_code: str