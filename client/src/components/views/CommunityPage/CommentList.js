import React, { useState, useEffect } from 'react';
import {
    detailArticle,
    listComment,
    selectComment,
    deleteComment,
    createComment,
    updatingComment,
} from '_api/Board.js';
import { ListGroup, Button, Badge, Form } from 'react-bootstrap';

function CommentList() {
    const [Article, setArticle] = useState({});
    const [Comments, setComments] = useState([]);
    const [Comment, setComment] = useState([]);
    const [updateComment, setupdateComment] = useState('');
    const [UpdateNum, setUpdateNum] = useState(null);
    useEffect(() => {
        detailArticle(8).then(res => {
            // console.log(res.data.data);
            setArticle(res.data.data);
            // console.log(Article);
        });
        listComment(8).then(res => {
            // console.log(res.data.data);
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
        // console.log('댓글');
        const body = {
            board_id: article_id,
            content: Comment,
        };
        console.log(body);
        createComment(body).then(res => {
            // console.log('create comment success');
            listComment(8).then(res => {
                // console.log(res.data.data);
                // console.log('comment create list!!');
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
                // console.log(res.data.data);
                // console.log('comment create list!!');
                setComments(res.data.data);
            });
        });
    };
    const onDeleteHander = idx => {
        // console.log(idx);
        deleteComment(idx).then(res => {
            listComment(8).then(res => {
                // console.log(res.data.data);
                // console.log('comment delete list!!');
                setComments(res.data.data);
            });
        });
    };
    const onUpdateHander = idx => {
        // console.log(idx, 123);
        setUpdateNum(idx);
        // console.log(UpdateNum, 11);
    };
    const onUpdateCommentHander = event => {
        // event.preventDefault();
        const board_comment_id = UpdateNum;
        // console.log('댓글');
        // console.log(UpdateNum, UpdateNum);
        const body = {
            board_comment_id: board_comment_id,
            content: updateComment,
        };
        console.log(body);
        updatingComment(body).then(res => {
            // console.log('create update success');
            listComment(8).then(res => {
                // console.log(res.data.data);
                // console.log('comment Update list!!');
                setComments(res.data.data);
                setUpdateNum(null);
            });
        });
    };
    const onCommentChangehandler = event => {
        setupdateComment(event.currentTarget.value);
    };
    const renderComments = Comments.map((comment, index) => {
        return (
            <ListGroup.Item key={index}>
                {comment.user_id}
                {comment.select ? <Badge variant="warning">Warning</Badge> : console.log()}
                {Article.select ? (
                    <Button onClick={() => onselectHander(comment.id)}>채택하기</Button>
                ) : (
                    console.log()
                )}
                <Button variant="danger" onClick={() => onDeleteHander(comment.id)}>
                    삭제
                </Button>
                {UpdateNum === comment.id ? (
                    console.log()
                ) : (
                    <Button variant="success" onClick={() => onUpdateHander(comment.id)}>
                        수정
                    </Button>
                )}

                <br />
                <br />
                {UpdateNum === comment.id ? (
                    <Form.Group>
                        <Form.Control
                            size="md"
                            type="text"
                            onChange={onCommentChangehandler}
                            defaultValue={comment.content}
                        />
                        <Button variant="success" onClick={() => onUpdateCommentHander(comment.id)}>
                            수정하기
                        </Button>
                    </Form.Group>
                ) : (
                    <p>{comment.content}</p>
                )}
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
