import React, { useEffect, useState } from 'react';
import { Space, Input, Card, Row, Col } from 'antd';
import './UploadedVideos.css';
import ProfileImage from './images/실전리액트프로그래밍.PNG';

function UploadedVideos() {
    const [Skip, setSkip] = useState(0);
    // const [Limit, setLimit] = useState(8);

    const { Meta } = Card;

    const Classes = [
        {
            title: '1',
            algorithm_tag_id: 'DP',
            type: 'C/C++',
        },
        {
            title: '2',
            algorithm_tag_id: 'DP',
            type: 'Java',
        },
        {
            title: '3',
            algorithm_tag_id: 'DFS/ BFS',
            type: 'Java',
        },
        {
            title: '4',
            algorithm_tag_id: '그래프',
            type: 'C/C++',
        },
        {
            title: '5',
            algorithm_tag_id: '그래프',
            type: 'python',
        },
        {
            title: '6',
            algorithm_tag_id: '최단경로',
            type: 'python',
        },
        {
            title: '7',
            algorithm_tag_id: '최단경로',
            type: 'python',
        },
        {
            title: '8',
            algorithm_tag_id: '그리디',
            type: 'C/C++',
        },
        {
            title: '9',
            algorithm_tag_id: '그리디',
            type: 'C/C++',
        },
        {
            title: '10',
            algorithm_tag_id: 'DFS/ BFS',
            type: 'C/C++',
        },
    ];
    // const [Classes, setClasses] = useState(Classses);
    // console.log(Classes);
    const renderCards = Classes.map((classs, index) => {
        return (
            <a href={'/watch/' + index} key={index}>
                <Col className="colcard" span={5}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={ProfileImage} />}
                        title={classs.title}
                        bordered={false}
                    ></Card>
                </Col>
            </a>
        );
    });

    return (
        <div>
            <h1 className="uploadedvideo">내가 업로드한 동영상</h1>
            <Row className="board">{renderCards}</Row>
            <Row>
                <Col lg={11}></Col>
                <Col lg={2}>
                    <button className="loadmorebtn">Load More</button>
                </Col>
                <Col lg={11}></Col>
            </Row>
        </div>
    );
}

export default UploadedVideos;
