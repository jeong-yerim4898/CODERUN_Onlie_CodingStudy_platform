import React, { useState, useEffect } from 'react';
import AddtoPlaylist from '../AddtoPlaylist.js';
import { useHistory } from 'react-router';
import './VideoInfo.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ListGroup, Image } from 'react-bootstrap';
import { HeartOutlined, PlusSquareOutlined, HeartTwoTone } from '@ant-design/icons';
//api
import { postVideoLike } from '_api/Video';
import { fetchPlaylist } from '_api/Playlist';

function VideoInfo(props) {
    const history = useHistory();
    const [Like, setLike] = useState(props.like);
    const [ClassList, setClassList] = useState([]);

    useEffect(() => {
        console.log(props);
        fetchPlaylist(props.VideoListId).then(res => {
            console.log(res.data.data);
            setClassList(res.data.data);
        });
    }, []);

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
    const onPlayListHander = video_id => {
        console.log(video_id);
        history.push({
            pathname: '/watch/' + video_id,
            state: { playlistId: props.VideoListId },
        });
    };

    const renderList =
        ClassList.length !== 0 ? (
            <div
                style={{
                    height: '250px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <InfiniteScroll dataLength={ClassList.length}>
                    {ClassList.map((data, idx) => (
                        <div>
                            {data.video_id === props.video.id ? (
                                <ListGroup
                                    onClick={() => onPlayListHander(data.Video.id)}
                                    className="classListItem"
                                    horizontal={true}
                                    key={idx}
                                >
                                    <ListGroup.Item className="classListItem">
                                        <Image
                                            src={data.Video.thumbnail}
                                            style={{ width: 60, height: 45 }}
                                        ></Image>
                                    </ListGroup.Item>

                                    <ListGroup.Item className="classListItem">
                                        {data.Video.title}
                                    </ListGroup.Item>
                                </ListGroup>
                            ) : (
                                <ListGroup
                                    onClick={() => onPlayListHander(data.Video.id)}
                                    style={{ cursor: 'pointer' }}
                                    horizontal={true}
                                    key={idx}
                                >
                                    <ListGroup.Item className="articleItem">
                                        <Image
                                            src={data.Video.thumbnail}
                                            style={{ width: 60, height: 45 }}
                                        ></Image>
                                    </ListGroup.Item>

                                    <ListGroup.Item
                                        style={{ textAlign: 'center' }}
                                        className="articleItem"
                                    >
                                        {data.Video.title}
                                    </ListGroup.Item>
                                </ListGroup>
                            )}
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        ) : (
            <div
                style={{
                    height: '0px',
                }}
            ></div>
        );
    return (
        <div class="video-info-container">
            <div class="card-content">
                <div class="card-row">
                    <div class="card-col">
                        <h2>
                            <strong>{props.video.title}</strong>
                        </h2>

                        <p>
                            {props.video.content} <br />
                        </p>
                        <hr></hr>
                        <p>재생목록</p>
                        {renderList}
                        <hr></hr>
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
