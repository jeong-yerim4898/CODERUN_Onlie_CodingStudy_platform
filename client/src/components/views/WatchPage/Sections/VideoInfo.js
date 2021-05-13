import React, { useState, useEffect } from 'react';
import AddtoPlaylist from '../AddtoPlaylist.js';
import './VideoInfo.scss';

import { ListGroup } from 'react-bootstrap';
import { HeartOutlined, PlusSquareOutlined, HeartTwoTone } from '@ant-design/icons';
//api
import { postVideoLike } from '_api/Video';
import { fetchPlaylist } from '_api/Playlist';

function VideoInfo(props) {
    const [Like, setLike] = useState(props.like);
    const [ClassList, setClassList] = useState([]);

    useEffect(() => {
        fetchPlaylist(props.VideoListId).then(res => {
            console.log(res.data.data);
            const playList = res.data.data;
        });
    }, []);

    // const renderList = if (props.VideoListId) {
    //     ['sm', 'md', 'lg', 'xl'].map((breakpoint, idx) => (
    //         <ListGroup horizontal={breakpoint} className="my-2" key={idx}>
    //             <ListGroup.Item>This ListGroup</ListGroup.Item>
    //             <ListGroup.Item>renders horizontally</ListGroup.Item>
    //             <ListGroup.Item>on {breakpoint}</ListGroup.Item>
    //             <ListGroup.Item>and above!</ListGroup.Item>
    //         </ListGroup>
    //     ));
    // }

    const clickHeart = e => {
        console.log(Like);
        if (Like === false) {
            setLike(true);
            postVideoLike(props.video.id)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        } else {
            setLike(false);
            postVideoLike(props.video.id)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div class="video-info-container">
            <div class="card-content">
                <div class="card-row">
                    <div class="card-col">
                        <h2>
                            <strong>{props.video.title}</strong>
                        </h2>
                        <h2>
                            <strong>{props.VideoListId}</strong>
                        </h2>
                        <p>
                            {props.video.content} <br />
                        </p>
                    </div>
                    <div class="right col"></div>
                </div>
            </div>
            <div class="like-save-container">
                {Like ? (
                    <HeartTwoTone twoToneColor="#DC143C" onClick={clickHeart} />
                ) : (
                    <HeartOutlined onClick={clickHeart} />
                )}

                <AddtoPlaylist videoId={props.video.id} />
            </div>
            <hr></hr>
        </div>
    );
}

export default VideoInfo;
