# 표준 라이브러리
from os import path
from sys import path as pth
from typing import Optional

# 서드파티 라이브러리
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

# 로컬 라이브러리
pth.append(path.dirname(path.abspath(path.dirname(__file__))))
from database import models, schemas
from dependency import get_db
from routers.user import get_current_user


router = APIRouter()


@router.post("/api/board", tags=["board"], description="게시판 글 작성")
def post_board(
    data: schemas.BoardBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    board_data = models.Board(
        user_id=current_user.id,
        title=data.title,
        content=data.content,
    )
    db.add(board_data)
    db.commit()
    db.refresh(board_data)
    return {"data": board_data}



@router.post("/api/board/comment", tags=["board"], description="게시판 답변 글 작성")
def post_board_comment(
    data: schemas.BoardCommentBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    board_comment_data = models.BoardComment(
        user_id=current_user.id,
        board_id=data.board_id,
        content=data.content,
    )
    db.add(board_comment_data)
    db.commit()
    db.refresh(board_comment_data)
    return {"data": board_comment_data}


@router.put("/api/board/comment/select", tags=["board"], description="게시판 답변 채택")
def select_comment(
    data: schemas.BoardSelectBase,
    token: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    current_user = get_current_user(token, db)
    current_board_comment = db.query(models.BoardComment).filter(models.BoardComment.id == data.board_comment_id).first()
    current_board = db.query(models.Board).filter(models.Board.id == current_board_comment.board_id).first()
    if current_board.user_id != current_user.id:
        raise HTTPException(status_code=401, detail="권한이 없습니다.")
    if current_board.select:
        raise HTTPException(status_code=401, detail="이미 채택된 게시글입니다.")

    current_board.select = True
    current_board_comment.select = True
    db.commit()
    db.refresh(current_board)
    db.refresh(current_board_comment)
    return{"data": current_board_comment}