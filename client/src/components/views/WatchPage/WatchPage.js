import React, { useState, useEffect } from 'react';
import ShowVideo from './ShowVideo';
import VideoInfo from './Sections/VideoInfo';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { Row, Col } from 'react-bootstrap';
import './AddtoPlaylist.js';

//api
import { fetchVideoDetail, postVideoLike } from '_api/Video';
import AddtoPlaylist from './AddtoPlaylist.js';

function WatchPage() {
    const [VideoDetail, setVideoDetail] = useState({});
    const [LikeStatus, setLikeStatus] = useState(true);

    // const [Like, setLike] = useState(props.like);
    useEffect(() => {
        const videoData = async () => {
            try {
                const res = await fetchVideoDetail(67);
                console.log(res.data);
                setVideoDetail(res.data.data);
                setLikeStatus(res.data.like_status);
            } catch (err) {
                console.log(err);
            }
        };
        videoData();
    }, []);

    const clickHeart = e => {
        console.log(LikeStatus);
        if (LikeStatus === false) {
            setLikeStatus(true);
            postVideoLike(VideoDetail.id)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        } else {
            setLikeStatus(false);
            postVideoLike(VideoDetail.id)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <Row>
                <Col lg={9}>{/* <ShowVideo /> */}</Col>
                <Col lg={3}>
                    <div class="video-info-container">
                        <div class="card-content">
                            <div class="row">
                                <div class="left col">
                                    <h2>
                                        <strong>{VideoDetail.title}</strong>
                                    </h2>
                                    <p>
                                        {VideoDetail.content} <br />
                                    </p>
                                </div>
                                <div class="right col"></div>
                            </div>
                        </div>
                        <div class="like-save-container">
                            {LikeStatus ? (
                                <HeartTwoTone twoToneColor="#DC143C" onClick={clickHeart} />
                            ) : (
                                <HeartOutlined onClick={clickHeart} />
                            )}
                            <AddtoPlaylist />
                        </div>
                        <hr></hr>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default WatchPage;
