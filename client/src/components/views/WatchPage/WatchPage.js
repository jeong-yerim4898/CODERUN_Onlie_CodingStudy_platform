import React from 'react';
import ShowVideo from './ShowVideo';
import { Row, Col } from 'react-bootstrap';

function WatchPage() {
    return (
        <div>
            <Row>
                <Col lg={9}>
                    <ShowVideo />
                </Col>
                <Col lg={3}>VideoInfo</Col>
            </Row>
        </div>
    );
}

export default WatchPage;
