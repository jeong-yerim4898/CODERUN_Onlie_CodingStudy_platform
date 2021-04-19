from typing import Optional

from fastapi import APIRouter, Form

router = APIRouter()


@router.get("/", tags=["user"], description="회원관리")
def read_root():
    return {"Hello": "World"}


@router.post("/items", tags=["user"], description="회원관리")
def read_item(item_id: int = Form(...), item_name: str = Form(...)):
    return {"item_id": item_id}