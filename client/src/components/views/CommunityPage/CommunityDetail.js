import React, { useEffect, useState } from 'react';
import { detailArticle, deleteArticle, createComment } from '_api/Board.js';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';

function CommunityDetail() {
    const [Article, setArticle] = useState({});
    const [Comment, setComment] = useState('');

    useEffect(() => {
        detailArticle(8).then(res => {
            console.log(res.data.data);
            setArticle(res.data.data);
            console.log(Article);
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
        });
    };
    const deleteHandler = event => {
        event.preventDefault();
        const article_id = 10;
        console.log(1);

        deleteArticle(article_id).then(res => {
            console.log('delete success');
        });
    };
    return (
        <div>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>{Article.title}</h1>
                    <h2>{Article.content}</h2>
                    <Link to="update/8">
                        <Button variant="success">수정</Button>
                    </Link>
                    <Button variant="danger" onClick={deleteHandler}>
                        삭제
                    </Button>
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
                    <br />
                    <CommentList />
                    <br />
                </Col>
            </Row>
        </div>
    );
}

export default CommunityDetail;
