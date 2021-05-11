import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { detailArticle, deleteArticle } from '_api/Board.js';
import { Button, Col, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CommentList from './CommentList';

function CommunityDetail(props) {
    const [Article, setArticle] = useState({});
    const history = useHistory();
    let user = useSelector(state => state.user);
    useEffect(() => {
        console.log(user.login.user.id);
        detailArticle(props.match.params.id).then(res => {
            console.log(res.data.data);
            setArticle(res.data.data);
            console.log(Article);
        });
    }, []);

    const deleteHandler = event => {
        event.preventDefault();
        const article_id = props.match.params.id;
        deleteArticle(article_id).then(res => {
            props.history.push('/community');
        });
    };
    return (
        <div>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h1>
                        {Article.title}{' '}
                        {Article.select ? <Button variant="warning">채택</Button> : console.log()}
                    </h1>
                    <h2>{Article.content}</h2>
                    {Article.user_id === user.login.user.id ? (
                        <div>
                            <Link to={`update/${props.match.params.id}`}>
                                <Button variant="success">수정</Button>
                            </Link>
                            <Button variant="danger" onClick={deleteHandler}>
                                삭제
                            </Button>
                        </div>
                    ) : (
                        console.log()
                    )}

                    <br />
                    <CommentList ArticleId={props.match.params.id} />
                    <br />
                </Col>
            </Row>
        </div>
    );
}

export default CommunityDetail;
