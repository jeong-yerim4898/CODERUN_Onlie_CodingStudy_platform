import React from 'react';
import Video from './videos/video.mp4';
import { Button } from 'react-bootstrap';
import './MainPage.css';

function MainPage() {
    return (
        <div>
            <div className="banner">
                <video
                    className="bannervd"
                    width="100%"
                    autoPlay
                    loop
                    muted
                    src={Video}
                    type="video/mp4"
                ></video>
                <div className="bannerment">
                    <h1 className="bannertext">코딩 스터디 동영상 공유 플랫폼</h1>
                    <h1 className="bannertext">희망찬 미래를 코드런에서 펼치세요!</h1>
                    <Button href="/class" variant="info">
                        시작하기
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
