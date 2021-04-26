import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Card, Row, Badge } from 'react-bootstrap';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './BestClasses.css';
import BestClass from './images/실전리액트프로그래밍.PNG';

function BestClasses() {
    const Classes = [
        { title: '제목1', nickname: '닉네임1' },
        { title: '제목2', nickname: '닉네임2' },
        { title: '제목3', nickname: '닉네임3' },
        { title: '제목4', nickname: '닉네임4' },
        { title: '제목5', nickname: '닉네임5' },
        { title: '제목6', nickname: '닉네임6' },
        { title: '제목7', nickname: '닉네임7' },
        { title: '제목8', nickname: '닉네임8' },
        { title: '제목9', nickname: '닉네임9' },
        { title: '제목10', nickname: '닉네임10' },
    ];

    const renderCards = Classes.map((classs, index) => {
        return (
            <a className="Class-atag" href={'/watch/' + index} key={index}>
                <Card className="owl-theme BestClass">
                    <Card.Img className="BestClassImage" src={BestClass} />
                    <Card.Title className="BestClassTitle">{classs.title}</Card.Title>
                    <Card.Text className="BestClassNickname">{classs.nickname}</Card.Text>
                    {/* <Card.Text className="BestClassPrice">
                        월 {classs.price}원 <Badge variant="warning">Free</Badge>
                    </Card.Text> */}
                </Card>
            </a>
        );
    });

    return (
        <div className="BestClasses">
            <h1>Best Classes</h1>
            <Row className="BestClassesRow">
                <OwlCarousel className="BestClasss" loop items={4} autoplay={true}>
                    {renderCards}
                </OwlCarousel>
            </Row>
            <br />
        </div>
    );
}

export default BestClasses;
