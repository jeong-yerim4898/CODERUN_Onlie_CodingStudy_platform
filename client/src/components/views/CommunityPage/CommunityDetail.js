import React, { useEffect, useState } from 'react';
import { detailArticle, deleteArticle, createComment, listComment } from '_api/Board.js';
import { Button, Col, Row } from 'react-bootstrap';
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

                    <br />
                    <CommentList />
                    <br />
                </Col>
            </Row>
        </div>
    );
}

export default CommunityDetail;
