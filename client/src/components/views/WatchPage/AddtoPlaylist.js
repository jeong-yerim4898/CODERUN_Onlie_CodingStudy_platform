import React, { useState, useEffect } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Modal, Button } from 'react-bootstrap';
import { readPlaylist, createPlaylistdata, deletePlaylistdata } from '_api/Playlist.js';
import { Radio } from 'antd';

function AddtoPlaylist(props) {
    const [Playlists, setPlaylists] = useState([]);
    const [SelectPlaylist, setSelectPlaylist] = useState('');
    const [AddtoPlaylist, setAddtoPlaylist] = useState('');
    const [UpdateNum, setUpdateNum] = useState(null);
    const video_list_id = UpdateNum;
    const video_id = props.classId;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log(video_id);
        readPlaylist().then(res => {
            console.log(res.data.data);
            console.log('play list!!');
            setPlaylists(res.data.data);
        });
    }, []);

    const selectPlaylistHandler = num => {
        console.log('radio checked', num);
        setSelectPlaylist(num);
    };

    const onAddVideotoPlaylist = event => {
        const body = {
            video_list_id: SelectPlaylist,
            video_id: video_id,
        };
        console.log(body);
        createPlaylistdata(body).then(res => {
            setAddtoPlaylist(res.data.data);
            setUpdateNum(null);
        });
    };

    const renderPlaylists = Playlists.map((playlist, idx) => {
        return (
            <Radio
                key={idx}
                onChange={() => selectPlaylistHandler(playlist.id)}
                value={SelectPlaylist}
            >
                {playlist.title}
            </Radio>
        );
    });

    return (
        <div>
            <PlusSquareOutlined onClick={handleShow} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>내 재생 목록에 추가하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>{renderPlaylists}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={() => onAddVideotoPlaylist()}>
                        추가
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddtoPlaylist;
