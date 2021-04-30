import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { readPlaylist, updatePlaylist, deletePlaylist } from '_api/Playlist.js';
import MyPlayListCreateForm from './MyPlayListCreateForm.js';

function MyPlayList() {
    return (
        <div>
            <MyPlayListCreateForm />
        </div>
    );
}

export default MyPlayList;
