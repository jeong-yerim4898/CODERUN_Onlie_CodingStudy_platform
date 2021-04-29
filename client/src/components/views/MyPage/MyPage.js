import React from 'react';
// import ChartistGraph from 'react-chartist';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import ProfileImage from './images/defaultimage.PNG';
import UploadedVideos from './UploadedVideos.js';
import MyPlayList from './MyPlayList.js';

function MyPage() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md="10"></Col>
                    {/* 로그아웃 */}
                    <Col md="2">
                        <Button className="m-0" href="#pablo" onClick={e => e.preventDefault()}>
                            <span className="no-icon">Log out</span>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        {/* 나의 재생 리스트 */}
                        <MyPlayList />
                    </Col>
                    {/* 사용자프로필 */}
                    <Col md="4">
                        <Card className="card-user">
                            <Card.Body>
                                <div className="user">
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="avatar border-gray"
                                            src={ProfileImage}
                                        ></img>
                                        <h5 className="title">사용자 닉네임</h5>
                                    </a>
                                    <p className="description">사용자 이메일</p>
                                </div>
                                <p className="description text-center">사용자 소개</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {/* 내가 올린 동영상들 */}
                    <UploadedVideos />
                </Row>
                {/* 그래프 */}
                {/* <Card>
                    <Card.Header>
                        <Card.Title as="h4">Q&A 채택률</Card.Title>
                        <p className="card-category">Last Campaign Performance</p>
                    </Card.Header>
                    <Card.Body>
                        <div className="ct-chart ct-perfect-fourth" id="chartPreferences">
                            <ChartistGraph
                                data={{
                                    labels: ['40%', '20%', '40%'],
                                    series: [40, 20, 40],
                                }}
                                type="Pie"
                            />
                        </div>
                        <div className="legend">
                            <i className="fas fa-circle text-info">등록 질문 수</i>
                            <i className="fas fa-circle text-danger">등록 답변 수</i>
                            <i className="fas fa-circle text-warning">채택 답변 수</i>
                        </div>
                        <hr></hr>
                        <div className="stats">
                            <i className="far fa-clock"></i>
                            사용자 닉네임님의 채택률은 (채택 답변 수 / 등록 답변수 X 100)% 입니다.
                        </div>
                    </Card.Body>
                </Card> */}
            </Container>
        </div>
    );
}

export default MyPage;
