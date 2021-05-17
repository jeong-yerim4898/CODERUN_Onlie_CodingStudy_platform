import React, { useState, useEffect } from 'react';
// import ChartistGraph from 'react-chartist';
import Footer from 'components/views/Footer/Footer';
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
    const [ImageUrl, setImageUrl] = useState('');

    const renderImageUrl = () => {
        const date = new Date();
        setImageUrl(props.user.login.user.profile + '?' + date);
    };
    const deleteToken = () => {
        localStorage.removeItem('token');
        props.history.push('/account');
    };

    const onDeleteProfileHandler = id => {
        console.log('delete');
        deleteProfileImage(id).then(res => {
            console.log(res.data);
            console.log('good');
            setPreviewUrl(`${SERVER}/image/profile/${props.user.login.user.id}`);
        });
    };

    const canclePreviewImg = () => {
        setPreviewUrl('');
    };

    const dropHandler = file => {
        console.log(file);
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     setPreviewUrl(reader.result);
        // };
        // reader.readAsDataURL(file[0]);
        // setFile(file[0]);
        let formData = new FormData();
        formData.append('file', file[0]);
        const user_id = props.user.login.user.id;
        console.log(user_id);
        createProfileImage(user_id, formData)
            .then(res => {
                console.log(res.data);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
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
                                    <aside class="profile-image">
                                        <Dropzone onDrop={dropHandler}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div
                                                        style={{
                                                            width: 280,
                                                            height: 210,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                        {...getRootProps()}
                                                    >
                                                        <img
                                                            style={{
                                                                height: 210,
                                                                objectFit: 'cover',
                                                                width: `100%`,
                                                                marginTop: '5px',
                                                                marginLeft: '2px',
                                                                borderRadius: '10px',
                                                            }}
                                                            src={ImageUrl}
                                                            onError={renderImageUrl}
                                                        ></img>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>

                                        <a href={'/update/user/' + props.user.login.user.id}>
                                            <FontAwesomeIcon icon={faUserEdit} className="camera" />
                                        </a>
                                        <FontAwesomeIcon
                                            style={{ cursor: 'pointer' }}
                                            icon={faTrashAlt}
                                            className="trash"
                                            onClick={() =>
                                                onDeleteProfileHandler(props.user.login.user.id)
                                            }
                                        />
                                    </aside>
                                    <section class="profile-info">
                                        <h1 class="first-name"></h1>
                                        <h1 class="second-name">{props.user.login.user.name}</h1>
                                        <p>{props.user.login.user.email}</p>
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
            <Footer></Footer>
        </div>
    );
}

export default MyPage;
