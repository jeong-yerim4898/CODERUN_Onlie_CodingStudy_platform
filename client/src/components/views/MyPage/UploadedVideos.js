import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Space, Input, Card, Row, Col } from 'antd';
import './UploadedVideos.css';

function UploadedVideos(props) {
    const history = useHistory();
    const [Classes, setClasses] = useState(props.VideoArray);

    useEffect(() => {
        setClasses(props.VideoArray);
    }, [props.VideoArray]);

    const toWatchHandler = num => {
        history.push('/watch/' + num);
    };

    const renderCards = Classes.map((classs, index) => {
        return (
            <div>
                <Col className="colcard" span={5}>
                    <Card
                        hoverable
                        onClick={() => toWatchHandler(classs.id)}
                        className="shadow classCard"
                        style={{ width: 240, height: 300 }}
                        cover={
                            <img
                                className="classImg"
                                style={{ width: '100%', height: '210px' }}
                                alt="example"
                                src={classs.thumbnail}
                            />
                        }
                        bordered={false}
                    >
                        <p className="classTitle " style={{ fontSize: '18px' }}>
                            {classs.title}
                        </p>
                    </Card>
                </Col>
            </div>
        );
    });

    return (
        <div className="mypage-uploadvideo-container">
            <div className="mypage-card-title">
                <h1 style={{ fontWeight: 'bold' }}>내가 업로드한 동영상</h1>
            </div>
            <Row className="board">{Classes.length > 0 ? renderCards : null}</Row>

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
