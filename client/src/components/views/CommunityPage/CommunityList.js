import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';

function CommunityList() {
    return (
        <div>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <ListGroup>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}

export default CommunityList;
