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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './MyPage.css';

function MyPage(props) {
    const [File, setFile] = useState('');
    const [PreviewUrl, setPreviewUrl] = useState('');
    const nickname = props.user.login.user.name;
    const email = props.user.login.user.email;
    const img = props.user.login.user.profile;

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
        <div className="mypage">
            <Container fluid>
                <Row>
                    {/* 나의 재생 리스트 */}
                    <Col md="6">
                        <MyPlayList />
                        {/* <MyPlayListCreateForm /> */}
                    </Col>
                    {/* 사용자프로필 */}
                    <Col md="6">
                        <main class="profile">
                            <div class="profile-bg"></div>
                            <section class="container">
                                <aside class="profile-image" src={img}>
                                    <a href={'/update/user/' + props.user.login.user.id}>
                                        <FontAwesomeIcon icon={faUserEdit} className="camera" />
                                    </a>
                                </aside>
                                <section class="profile-info">
                                    <h1 class="first-name"></h1>
                                    <h1 class="second-name">{nickname}</h1>
                                    <p>{email}</p>
                                    {/* 로그아웃 */}
                                    <a onClick={deleteToken}>
                                        <h2>LOG OUT</h2>
                                    </a>
                                </section>
                            </section>
                            <section class="statistics">
                                <button class="icon arrow left"></button>
                                <button class="icon arrow right"></button>
                                <p>
                                    <strong>29</strong> Followers
                                </p>
                                <p>
                                    <strong>184</strong> Following
                                </p>
                                <p>
                                    <strong>6</strong> Likes
                                </p>
                            </section>
                            <button class="icon close"></button>
                        </main>
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
