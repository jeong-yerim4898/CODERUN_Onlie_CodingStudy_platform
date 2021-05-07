import React, { useState, useEffect } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Modal, Button } from 'react-bootstrap';
import { createPlaylistdata, deletePlaylistdata } from '_api/Playlist.js';
// import { renderPlaylists } from '../MyPage/MyPlayList.js';

function AddtoPlaylist(props) {
    const [selectPlaylist, setselectPlaylist] = useState('');
    const [AddtoPlaylist, setAddtoPlaylist] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <PlusSquareOutlined onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>내 재생 목록에 추가하기</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>{renderPlaylists}</Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        추가
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddtoPlaylist;
