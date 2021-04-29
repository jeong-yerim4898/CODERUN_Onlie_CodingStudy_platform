import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function MyPlayList() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                플레이리스트 만들기
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>제목제목</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control size="lg" type="text" placeholder="Large text" />
                        <br />
                        <Form.Control type="text" placeholder="Normal text" />
                        <br />
                        <Form.Control size="sm" type="text" placeholder="Small text" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyPlayList;
