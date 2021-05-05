import React, { useState } from 'react';
import './VideoInfo.scss';

import { HeartOutlined, PlusSquareOutlined, HeartTwoTone } from '@ant-design/icons';
//api
import { postVideoLike } from '_api/Video';

function VideoInfo(props) {
    console.log('like' + props.like);
    // const Like = props.like;
    const [Like, setLike] = useState(props.like);
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
                <div class="row">
                    <div class="left col">
                        <h2>
                            <strong>{props.video.title}</strong>
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

                <PlusSquareOutlined />
            </div>
            <hr></hr>
        </div>
    );
}

export default VideoInfo;
