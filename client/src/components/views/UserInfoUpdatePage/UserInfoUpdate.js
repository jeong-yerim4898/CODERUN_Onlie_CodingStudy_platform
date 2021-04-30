import React, { useState } from 'react';
import './UserInfoUpdate.css';
import { Avatar } from 'antd';
import { updateUserInfo } from '_api/User';

function UserInfoUpdate(props) {
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
        console.log(pwconfirm);
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
        const body = { password: HashPasswordConfirm, name: UpdateNickname };
        updateUserInfo(body)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        props.history.push(`/profile/${props.user.login.user.id}`);
    };

    return (
        <div class="update-container">
            <div class="user-update-container">
                <h1>Update User Info</h1>
                <Avatar size={50}></Avatar>
                <input
                    placeholder={props.user.login.user.name}
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
