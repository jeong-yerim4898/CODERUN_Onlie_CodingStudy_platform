import React, { useState } from 'react';
// import ChartistGraph from 'react-chartist';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { SERVER } from 'Config.js';
import UploadedVideos from './UploadedVideos.js';
import MyPlayList from './MyPlayList.js';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { fetchProfileImage, createProfileImage, deleteProfileImage } from '_api/Profile.js';
// import MyPlayListCreateForm from './MyPlayListCreateForm.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './MyPage.css';

function MyPage(props) {
    const [File, setFile] = useState('');
    const [PreviewUrl, setPreviewUrl] = useState('');
    const nickname = props.user.login.user.name;
    const email = props.user.login.user.email;
    const img = props.user.login.user.profile;
    const user_id = props.user.login.user.id;

    const deleteToken = () => {
        localStorage.removeItem('token');
        props.history.push('/account');
    };

    const onDeleteProfileHandler = id => {
        console.log('delete');
        deleteProfileImage(id).then(res => {
            console.log(res.data);
            console.log('good');

            setPreviewUrl(`${SERVER}/image/profile/${user_id}`);
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
                            <section class="containerMyPage">
                                <aside class="profile-image" src={img}>
                                    <img
                                        style={{
                                            height: '70%',
                                            width: `100%`,
                                            marginTop: '10px',
                                            borderRadius: '10px',
                                        }}
                                        src={img}
                                    ></img>
                                    <a href={'/update/user/' + user_id}>
                                        <FontAwesomeIcon icon={faUserEdit} className="camera" />
                                    </a>
                                    <FontAwesomeIcon
                                        style={{ cursor: 'pointer' }}
                                        icon={faTrashAlt}
                                        className="trash"
                                        onClick={() => onDeleteProfileHandler(user_id)}
                                    />
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
