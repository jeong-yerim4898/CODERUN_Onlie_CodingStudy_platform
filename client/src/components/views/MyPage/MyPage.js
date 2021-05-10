import React, { useState } from 'react';
// import ChartistGraph from 'react-chartist';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import ProfileImage from './images/defaultimage.PNG';
import UploadedVideos from './UploadedVideos.js';
import MyPlayList from './MyPlayList.js';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import { fetchProfileImage, createProfileImage, deleteProfileImage } from '_api/Profile.js';
// import MyPlayListCreateForm from './MyPlayListCreateForm.js';

function MyPage(props) {
    const [File, setFile] = useState('');
    const [PreviewUrl, setPreviewUrl] = useState('');

    const deleteToken = () => {
        localStorage.removeItem('token');
        props.history.push('/account');
    };

    const postProfileImg = e => {
        const body = {
            file: File,
        };
        console.log(body);
        createProfileImage(body).then(res => {
            fetchProfileImage().then(res => {
                console.log(res.data);
                setFile(res.data.data);
            });
        });
    };

    const dropHandler = file => {
        console.log(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
    };

    const canclePreviewImg = () => {
        setPreviewUrl('');
    };

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col md="10"></Col>
                    {/* 로그아웃 */}
                    <Col md="2">
                        <Button className="m-0" href="#pablo" onClick={deleteToken}>
                            <span className="no-icon">Log out</span>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col md="8">
                        {/* 나의 재생 리스트 */}
                        <MyPlayList />
                        {/* <MyPlayListCreateForm /> */}
                    </Col>
                    {/* 사용자프로필 */}
                    <Col md="4">
                        <Card className="card-user">
                            <Card.Body>
                                <div className="user">
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        {PreviewUrl.length === 0 ? (
                                            <Dropzone onDrop={dropHandler}>
                                                {({ getRootProps, getInputProps }) => (
                                                    <section>
                                                        <div
                                                            style={{
                                                                width: 280,
                                                                height: 210,
                                                                border: '1px solid lightgray',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                            {...getRootProps()}
                                                        >
                                                            <input {...getInputProps()} />
                                                            <PlusOutlined
                                                                type="plus"
                                                                style={{ fontSize: '3rem' }}
                                                            />
                                                        </div>
                                                    </section>
                                                )}
                                            </Dropzone>
                                        ) : (
                                            <div>
                                                <img
                                                    style={{ height: '210px', width: '280px' }}
                                                    src={PreviewUrl}
                                                ></img>
                                            </div>
                                        )}
                                        <Button onClick={canclePreviewImg}>취소</Button>
                                        <h5 className="title">사용자 닉네임</h5>
                                    </a>
                                    <p className="description">사용자 이메일</p>
                                </div>
                                <p className="description text-center">사용자 소개</p>
                                <Button onClick={postProfileImg}>등록</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    {/* 내가 올린 동영상들 */}
                    <UploadedVideos />
                </Row>
            </Container>
        </div>
    );
}

export default MyPage;
