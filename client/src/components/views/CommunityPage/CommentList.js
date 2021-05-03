import React, { useState, useEffect } from 'react';
import { listComment, selectComment, deleteComment, createComment } from '_api/Board.js';
import { ListGroup, Button, Badge, Form } from 'react-bootstrap';

function CommentList() {
    const [Comments, setComments] = useState([]);
    const [Comment, setComment] = useState([]);
    useEffect(() => {
        listComment(8).then(res => {
            console.log(res.data.data);
            // console.log('comment list!!');
            setComments(res.data.data);
        });
    }, []);

    const commentHandler = event => {
        setComment(event.currentTarget.value);
    };
    const createCommentHandler = event => {
        event.preventDefault();
        const article_id = 8;
        console.log('댓글');
        const body = {
            board_id: article_id,
            content: Comment,
        };
        console.log(body);
        createComment(body).then(res => {
            console.log('create comment success');
            listComment(8).then(res => {
                console.log(res.data.data);
                console.log('comment create list!!');
                setComments(res.data.data);
            });
        });
    };
    const onselectHander = idx => {
        console.log(idx, 1);
        const body = {
            board_comment_id: idx,
        };
        selectComment(body).then(res => {
            listComment(8).then(res => {
                console.log(res.data.data);
                console.log('comment create list!!');
                setComments(res.data.data);
            });
        });
    };
    const onDeleteHander = idx => {
        console.log(idx);
        deleteComment(idx).then(res => {
            listComment(8).then(res => {
                console.log(res.data.data);
                console.log('comment delete list!!');
                setComments(res.data.data);
            });
        });
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
            <h4>댓글</h4>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="textarea"
                        placeholder="Enter email"
                        onChange={commentHandler}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={createCommentHandler}>
                    댓글작성
                </Button>
            </Form>
            <ListGroup>{renderComments}</ListGroup>
        </div>
    );
}

export default CommentList;
