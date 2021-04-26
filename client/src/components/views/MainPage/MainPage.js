import React from 'react';
import Video from './videos/video.mp4';
import './MainPage.css';
import MainPageSearch from './MainPageSearch.js';
import BestClasses from './BestClasses.js';
import SelectCourse from './SelectCourse.js';

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
                    <h1 className="bannertitle">코딩 스터디 플랫폼</h1>
                    <h1 className="bannersubtitle">희망찬 미래를 코드런에서 펼치세요!</h1>
                    <a href="/class">
                        <button className="GetStartedBtn">시작하기</button>
                    </a>
                </div>
            </div>
            {/* 검색창 */}
            <MainPageSearch />
            {/* Top 10 클래스들 */}
            <BestClasses />
            {/* 클래스 코스 선택 */}
            <SelectCourse />
        </div>
    );
}

export default MainPage;
