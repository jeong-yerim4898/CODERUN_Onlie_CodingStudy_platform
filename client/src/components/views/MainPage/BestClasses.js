import React from 'react';
import { Card, Row } from 'react-bootstrap';
import './BestClasses.css';
import BestClass from './images/실전리액트프로그래밍.PNG';

function BestClasses() {
    const Classes = [
        { title: '제목1', nickname: '닉네임1' },
        { title: '제목2', nickname: '닉네임2' },
        { title: '제목3', nickname: '닉네임3' },
        { title: '제목4', nickname: '닉네임4' },
        { title: '제목5', nickname: '닉네임5' },
    ];

    const renderCards = Classes.map((classs, index) => {
        return (
            <Card className="BestClass">
                <Card.Img className="BestClassImage" src={BestClass} />
                <Card.Title className="BestClassTitle">{classs.title}</Card.Title>
                <Card.Text className="BestClassNickname">{classs.nickname}</Card.Text>
            </Card>
        );
    });

    return (
        <div className="BestClasses">
            <h1>Best Classes</h1>
            <Row className="BestClassesRow">{renderCards}</Row>
            <br />
        </div>
    );
}

export default BestClasses;
