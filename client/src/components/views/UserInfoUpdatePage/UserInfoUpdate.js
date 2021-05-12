import React, { useState, useEffect } from 'react';
import './UserInfoUpdate.css';
import { Avatar, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import Dropzone from 'react-dropzone';
import { SERVER } from 'Config.js';
import { updateUserInfo } from '_api/User';
import { useDispatch } from 'react-redux';
import { updateUser } from '_actions/user_actions';
import { fetchProfileImage, createProfileImage } from '_api/Profile';

function UserInfoUpdate(props) {
    const [File, setFile] = useState([]);
    const [PreviewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        console.log(props.user.login.user);
        setPreviewUrl(props.user.login.user.profile);
    }, []);

    const dropHandler = file => {
        console.log(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file[0]);
        setFile(file[0]);
    };

    // const onPreview = async file => {
    //     let src = file.url;
    //     if (!src) {
    //         src = await new Promise(resolve => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj);
    //             reader.onload = () => resolve(reader.result);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow.document.write(image.outerHTML);
    // };

    const dispatch = useDispatch();
    const [UpdateNickname, setUpdateNickname] = useState('');
    const [UpdatePassword, setUpdatePassword] = useState('');
    const [UpdatePasswordConfirm, setUpdatePasswordConfirm] = useState('');
    const [HashPasswordConfirm, setHashPasswordConfirm] = useState('');

    const passwordHandler = event => {
        let pw = event.currentTarget.value;
        setUpdatePassword(pw);
    };

    const passwordConfirmHandler = event => {
        const pwconfirm = document.getElementsByClassName('update-password-confirm');
        let pw = event.currentTarget.value;
        setUpdatePasswordConfirm(pw);
        const sha = require('sha256');
        if (UpdatePassword === pw) {
            setHashPasswordConfirm(sha(pw));
            pwconfirm[0].style.backgroundColor = '#eee';
        } else {
            console.log('not same');
            pwconfirm[0].style.backgroundColor = '#ffdcdc';
        }
    };
    const NicknameHandler = event => {
        let name = event.currentTarget.value;
        setUpdateNickname(name);
    };

    const submitInfo = () => {
        if (HashPasswordConfirm.length === 0 || UpdateNickname.length === 0 || !File) {
            alert('데이터를 모두 넣어주세요.');
        } else {
            const body = { password: HashPasswordConfirm, name: UpdateNickname };
            let formData = new FormData();
            formData.append('file', File);
            const user_id = props.user.login.user.id;
            console.log(user_id);
            createProfileImage(user_id, formData).then(res => {
                console.log('good');
                // fetchProfileImage(user_id).then(res => {
                setPreviewUrl(`${SERVER}/image/profile/${user_id}`);
                props.history.push(`/profile/${props.user.login.user.id}`);
                // setFile(res.data.data);
                // });
            });
            dispatch(updateUser(body))
                .then(res => {
                    console.log(res);
                    console.log(props.user.login.user.id, 'userid');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div class="update-container">
            <div class="user-update-container">
                <h1>Update User Info</h1>
                {/* <Avatar size={150}> */}
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
                                    <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                                </div>
                            </section>
                        )}
                    </Dropzone>
                ) : (
                    <div style={{ display: 'flex' }}>
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
                                        <PlusOutlined type="plus" style={{ fontSize: '3rem' }} />
                                    </div>
                                </section>
                            )}
                        </Dropzone>{' '}
                        <img style={{ height: '210px', width: '280px' }} src={PreviewUrl}></img>
                    </div>
                )}
                {/* </Avatar> */}
                <input
                    defaultValue={props.user.login.user.name}
                    class="update-nickname"
                    onChange={NicknameHandler}
                />
                <input
                    type="password"
                    placeholder="새로운 비밀번호"
                    class="update-password"
                    onChange={passwordHandler}
                />
                <input
                    type="password"
                    placeholder="새로운 비밀번호 확인"
                    class="update-password-confirm"
                    onChange={passwordConfirmHandler}
                />
                <button onClick={submitInfo}>submit</button>
            </div>
        </div>
    );
}

export default UserInfoUpdate;
