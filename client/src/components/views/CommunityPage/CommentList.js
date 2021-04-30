import React, { useState, useEffect } from 'react';
import { listComment, selectComment, deleteComment } from '_api/Board.js';
import { ListGroup, Button, Badge } from 'react-bootstrap';

function CommentList() {
    const [Comments, setComments] = useState([]);
    useEffect(() => {
        listComment(8).then(res => {
            console.log(res.data.data);
            // console.log('comment list!!');
            setComments(res.data.data);
        });
    }, []);
    const onselectHander = idx => {
        console.log(idx, 1);
        const body = {
            board_comment_id: idx,
        };
        selectComment(body);
    };
    const onDeleteHander = idx => {
        console.log(idx);
        deleteComment(idx);
    };
    const renderComments = Comments.map((comment, index) => {
        return (
            <ListGroup.Item key={index}>
                {comment.content}
                {comment.select ? <Badge variant="warning">Warning</Badge> : console.log()}
                <Button onClick={() => onselectHander(comment.id)}>채택하기</Button>
                <Button variant="danger" onClick={() => onDeleteHander(comment.id)}>
                    삭제
                </Button>
            </ListGroup.Item>
        );
    });
    return (
        <div>
            <ListGroup>{renderComments}</ListGroup>
        </div>
    );
}

export default CommentList;
