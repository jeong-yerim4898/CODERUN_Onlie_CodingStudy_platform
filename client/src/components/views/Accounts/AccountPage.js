import React, { useState } from 'react';
import './AccountPage.css';

function LoginPage() {
    const [HashPassword, setHashPassword] = useState('');
    const [HashPasswordConfirm, setHashPasswordConfirm] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordConfirm, setPasswordConfirm] = useState('');
    const [Email, setEmail] = useState('');
    const [Nickname, setNickname] = useState('');
    const accountclick = event => {
        const container = document.getElementById('container');
        if (event.type === 'click') {
            if (event.target.id === 'signUp') {
                container.classList.add('right-panel-active');
            } else {
                container.classList.remove('right-panel-active');
            }
        }
    };
    const passwordHandler = event => {
        let pw = event.currentTarget.value;
        setPassword(pw);
    };

    const passwordConfirmHandler = event => {
        let pw = event.currentTarget.value;
        const sha = require('sha256');
        setHashPasswordConfirm(sha(pw));
        if (Password === pw) {
            setHashPasswordConfirm(sha(pw));
            console.log(HashPasswordConfirm);
        }
    };

    const ValidEmail = event => {
        let asValue = event.currentTarget.value;
        let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (regExp.test(asValue) === true) {
            console.log('pass');
            setEmail(asValue);
        } else {
            console.log('no');
        }
    };

    return (
        <div className="account-body">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <input type="email" placeholder="Email" onChange={ValidEmail} />
                            <button id="check-btn">확인</button>
                        </div>
                        <input type="text" placeholder="Nickname" />
                        <input type="password" placeholder="Password" onChange={passwordHandler} />
                        <input
                            type="password"
                            placeholder="PasswordConfirm"
                            onChange={passwordConfirmHandler}
                        />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>

                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">비밀번호 찾고 싶어?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>코드:RUN 입장</h1>
                            <p>어서 로그인 해줭!</p>
                            <button className="ghost" id="signIn" onClick={accountclick}>
                                Sign In
                            </button>
                        </div>

                        <div class="overlay-panel overlay-right">
                            <h1>
                                코드:RUN은<br></br>
                                처음이지?
                            </h1>
                            <p>너의 상세한 정보가 궁금해</p>
                            <button className="ghost" id="signUp" onClick={accountclick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;