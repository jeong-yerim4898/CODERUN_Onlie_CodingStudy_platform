import React, { useState, useEffect } from 'react';
import './UserInfoUpdate.css';
import Footer from 'components/views/Footer/Footer';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import { SERVER } from 'Config.js';
import { useDispatch } from 'react-redux';
import { updateUser } from '_actions/user_actions';
import { createProfileImage } from '_api/Profile';

function UserInfoUpdate(props) {
    const [File, setFile] = useState([]);
    const [PreviewUrl, setPreviewUrl] = useState('');
    const dispatch = useDispatch();
    const [UpdateNickname, setUpdateNickname] = useState(props.user.login.user.name);
    const [UpdatePassword, setUpdatePassword] = useState('');
    const [UpdatePasswordConfirm, setUpdatePasswordConfirm] = useState('');
    const [HashPasswordConfirm, setHashPasswordConfirm] = useState('');

    useEffect(() => {
        console.log(props.user.login.user);
        const date = new Date();
        setPreviewUrl(props.user.login.user.profile + '?' + date);
    }, []);
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

            dispatch(updateUser(body))
                .then(res => {
                    console.log(res);
                    console.log(props.user.login.user.id, 'userid');
                    props.history.push(`/profile/${props.user.login.user.id}`);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div class="update-container">
                <div class="user-update-container">
                    <h1>Update User Info</h1>
                    {/* <Avatar size={150}> */}
                    {/* {PreviewUrl.length === 0 ? (
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
                )} */}
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
            <Footer></Footer>
        </div>
    );
}

export default UserInfoUpdate;
