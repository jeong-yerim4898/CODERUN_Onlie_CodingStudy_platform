import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from 'components/views/Footer/Footer';
import { detailArticle, deleteArticle } from '_api/Board.js';
import { Button, Col, Row, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import CommentList from './CommentList';

import './CommunityDetail.css';

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
            <br></br>
            <br></br>
            <Row>
                <Col>
                    <div>
                        <Col md={{ span: 8, offset: 2 }}>
                            <h1>
                                {Article.title}{' '}
                                {Article.select ? (
                                    <Image
                                        src={`${process.env.PUBLIC_URL}/img/winner.png`}
                                        style={{ width: 60, height: 60, float: 'right' }}
                                        roundedCircle
                                    ></Image>
                                ) : (
                                    console.log()
                                )}
                            </h1>
                            <hr></hr>
                            <h2>
                                {Article.content}
                                {Article.user_id === user.login.user.id ? (
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
            <Footer></Footer>
        </div>
    );
}

export default CommunityDetail;
