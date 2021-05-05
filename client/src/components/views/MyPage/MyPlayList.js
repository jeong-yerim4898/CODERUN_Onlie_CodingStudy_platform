import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { readPlaylist, updatePlaylist, deletePlaylist } from '_api/Playlist.js';
import MyPlayListCreateForm from './MyPlayListCreateForm.js';
import './MyPlayList.css';

function MyPlayList() {
    const dispatch = useDispatch();
    const [Playlists, setPlaylists] = useState([]);

    useEffect(() => {
        dispatch(readPlaylist()).then(res => {
            const playlist_list = res.payload;
            //   console.log(res.payload)
            setPlaylists(playlist_list);
        });
    }, [dispatch]);

    const renderLists = Playlists.map((playlist, index) => {
        return (
            <ListGroup horizontal>
                <ListGroup.Item>
                    <a href={'/watch/' + index} key={index}>
                        {playlist.title}
                    </a>
                </ListGroup.Item>
                <ListGroup.Item>수정하기</ListGroup.Item>
                <ListGroup.Item>삭제하기</ListGroup.Item>
            </ListGroup>
        );
    });
    return (
        <div className="MyPlayList">
            {/* Create */}
            <MyPlayListCreateForm />

            {/* Read */}
            {renderLists}
        </div>
    );
}

export default MyPlayList;
