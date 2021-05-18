import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '_actions/user_actions';

import Footer from 'components/views/Footer/Footer';
import { Container, Row, Col } from 'react-bootstrap';

import { SERVER } from 'Config.js';
import UploadedVideos from './UploadedVideos.js';
import MyPlayList from './MyPlayList.js';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import {
    fetchProfileImage,
    createProfileImage,
    deleteProfileImage,
    profileStatistics,
    profileMyVideos,
} from '_api/Profile.js';
// import MyPlayListCreateForm from './MyPlayListCreateForm.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './MyPage.css';

function MyPage(props) {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.user);
    const [File, setFile] = useState('');
    const [PreviewUrl, setPreviewUrl] = useState('');
    const [ImageUrl, setImageUrl] = useState('');
    const [Statisticses, setStatisticses] = useState({});
    const [VideoArray, setVideoArray] = useState([]);

    useEffect(() => {
        const ProfileData = async () => {
            const res1 = await profileStatistics(props.user.login.user.id);
            setStatisticses(res1.data);
            const res2 = await profileMyVideos(props.user.login.user.id);
            setVideoArray(res2.data.data.video);
        };
        ProfileData();
    }, []);

    const renderImageUrl = () => {
        const date = new Date();
        setImageUrl(props.user.login.user.profile + '?' + date);
    };
    const deleteToken = () => {
        dispatch(logoutUser());
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
                <Row>
                    <Col lg={6}>
                        <div
                            className="mypage-logo-container"
                            style={{ display: 'flex', marginTop: '10%', marginLeft: '20%' }}
                        >
                            <h1 class="reveal-text">코드:런</h1>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <main class="profile">
                            <div class="profile-bg"></div>
                            <div class="containerMyPage">
                                <div class="profile-image">
                                    <Dropzone onDrop={dropHandler}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div
                                                    className="profile-img"
                                                    style={{
                                                        cursor: 'pointer',
                                                        width: 280,
                                                        height: 210,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                    {...getRootProps()}
                                                >
                                                    <input {...getInputProps()} />
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
                                                    />
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>

                                    <a href={'/update/user/' + props.user.login.user.id}>
                                        <FontAwesomeIcon
                                            icon={faUserEdit}
                                            className="camera"
                                            style={{ fontSize: '30px', marginLeft: '10%' }}
                                        />
                                    </a>
                                    <FontAwesomeIcon
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '30px',
                                            marginRight: '10%',
                                        }}
                                        icon={faTrashAlt}
                                        className="trash"
                                        onClick={() =>
                                            onDeleteProfileHandler(props.user.login.user.id)
                                        }
                                    />
                                </div>
                                <div class="profile-info">
                                    <h1 class="second-name">{props.user.login.user.name}</h1>
                                    <p>{props.user.login.user.email}</p>
                                    {/* 로그아웃 */}
                                    <a onClick={deleteToken}>
                                        <h2>LOG OUT</h2>
                                    </a>
                                </div>
                            </div>
                            <section class="statistics">
                                <p>
                                    <strong>{Statisticses.video_cnt}</strong> My Video
                                </p>
                                <p>
                                    <strong>{Statisticses.videolist_cnt}</strong> My VideoList
                                </p>
                                <p>
                                    <strong>{Statisticses.select_cnt}</strong> My Selection
                                </p>
                            </section>
                            <button class="icon close"></button>
                        </main>
                    </Col>
                </Row>

                <MyPlayList />

                {/* 내가 올린 동영상들 */}
                <UploadedVideos VideoArray={VideoArray} />
            </div>

            <Footer></Footer>
        </div>
    );
}

export default MyPage;
