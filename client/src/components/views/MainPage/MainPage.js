import React, { useState } from 'react';
import './MainPage.css';
import MainPageSearch from './MainPageSearch.js';
import BestClasses from './BestClasses.js';
import SelectCourse from './SelectCourse.js';
import { UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import BackImage from './images/back.png';

function MainPage() {
    const [mainPageIndex, setMainPageIndex] = useState(0);

    const changeMainPageIndex = function (idx) {
        if (idx < 0) {
            idx = 2;
        }
        setMainPageIndex(idx % 3);
    };

    return (
        <div className="mainPage">
            <div
                className="buttonChangeMainPageUpIndex"
                onClick={() => changeMainPageIndex(mainPageIndex + 1)}
            >
                <UpCircleOutlined />
            </div>
            <div
                className="buttonChangeMainPageDownIndex"
                onClick={() => changeMainPageIndex(mainPageIndex - 1)}
            >
                <DownCircleOutlined />
            </div>
            <div className="specificMainPage">
                {(function () {
                    if (mainPageIndex === 0)
                        return (
                            <div className="mainBanner">
                                <img className="backImage" src={BackImage} />
                                <div className="imageCodeRun">
                                    <img
                                        className="specificImageCodeRun"
                                        src={
                                            'https://images.unsplash.com/photo-1580894908361-967195033215?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
                                        }
                                        alt="이미지 자리"
                                    />
                                </div>
                                <div className="animateCodeRun">
                                    <span className="animateCodeRun1">C</span>
                                    <span className="animateCodeRun2">O</span>
                                    <span className="animateCodeRun3">D</span>
                                    <span className="animateCodeRun4">E</span>
                                    <span className="animateCodeRun5">:</span>
                                    <span className="animateCodeRun6">R</span>
                                    <span className="animateCodeRun7">U</span>
                                    <span className="animateCodeRun8">N</span>
                                </div>
                                <div className="startBack">
                                    <button className="getStartedBtn">시작하기</button>
                                </div>
                            </div>
                        );
                    else return <div />;
                })()}
            </div>
            <div className="specificMainPage">
                {(function () {
                    if (mainPageIndex === 1)
                        return (
                            <div className="specificMainPage">
                                <img className="backImage2" src={BackImage} />
                                <BestClasses />
                            </div>
                        );
                    else return <div />;
                })()}
            </div>
            <div className="specificMainPage">
                {(function () {
                    if (mainPageIndex === 2)
                        return (
                            <div className="specificMainPage">
                                <img className="backImage3" src={BackImage} />
                                <SelectCourse />
                            </div>
                        );
                    else return <div />;
                })()}
            </div>
        </div>
    );
}

export default MainPage;
