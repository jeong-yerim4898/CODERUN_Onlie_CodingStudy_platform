import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { detailArticle, deleteArticle } from '_api/Board.js';
import { Button, Col, Row, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import CommentList from './CommentList';

import './CommunityDetail.css';

function CommunityDetail(props) {
    const date = new Date();
    const num = props.match.params.id;

    const [Article, setArticle] = useState({});
    const history = useHistory();
    let user = useSelector(state => state.user);

    useEffect(() => {
        detailArticle(num).then(res => {
            setArticle(res.data.data);
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
            <div>
                <br></br>
                <br></br>
                <Row>
                    <Col>
                        <div>
                            <Col md={{ span: 8, offset: 2 }}>
                                <h1>
                                    {Article.Board?.title}{' '}
                                    {Article.Board?.select ? (
                                        <Image
                                            src={`${process.env.PUBLIC_URL}/img/winner.png`}
                                            style={{ width: 80, height: 80, float: 'right' }}
                                            roundedCircle
                                        ></Image>
                                    ) : (
                                        console.log()
                                    )}
                                </h1>
                                <Image
                                    src={Article.profile + '?' + date}
                                    style={{ width: 30, height: 30 }}
                                    roundedCircle
                                ></Image>
                                {Article.name}
                                <hr></hr>
                                <h2>
                                    {Article.Board?.content}
                                    {Article.Board?.user_id === user.login.user.id ? (
                                        <div style={{ float: 'right' }}>
                                            <Link
                                                style={{ color: 'black', width: 50 }}
                                                to={`update/${props.match.params.id}`}
                                            >
                                                <EditOutlined style={{ fontSize: '100%' }} />
                                            </Link>{' '}
                                            <CloseOutlined
                                                style={{ fontSize: '100%' }}
                                                onClick={deleteHandler}
                                            />
                                        </div>
                                    ) : (
                                        console.log()
                                    )}
                                </h2>

                                <br></br>
                            </Col>
                        </div>
                        <br></br>
                        <div className="CommentBg">
                            <Col md={{ span: 8, offset: 2 }}>
                                <br />
                                <CommentList ArticleId={props.match.params.id} />
                                <br />
                            </Col>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default CommunityDetail;
