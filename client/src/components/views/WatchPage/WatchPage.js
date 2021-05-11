import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Input, Button } from 'antd';
import './AddtoPlaylist.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import ShowVideo from './Sections/ShowVideo';
import VideoInfo from './Sections/VideoInfo';
import VideoCommentInput from './Sections/VideoCommentInput';
import VideoComment from './Sections/VideoComment';

//api
import { fetchVideoDetail, fetchVideoComments, deleteVideoComment } from '_api/Video';
import AddtoPlaylist from './AddtoPlaylist.js';

function WatchPage(props) {
    const video_id = props.match.params.id;
    const [VideoDetail, setVideoDetail] = useState({});
    const [VideoComments, setVideoComments] = useState([]);

    useEffect(() => {
        const videoData = async () => {
            try {
                const res = await fetchVideoDetail(video_id);
                setVideoDetail(res.data);
                const res2 = await fetchVideoComments(video_id);
                console.log(res2.data.data);
                setVideoComments(res2.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        videoData();
    }, []);

    const renderComment = () => {
        console.log(VideoComments, 'asdasdasd77777777');
        return (
            <div
                style={{
                    height: '350px',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <InfiniteScroll dataLength={VideoComments.length}>
                    {VideoComments.map((comment, index) => (
                        <VideoComment
                            key={index}
                            Videocomment={comment}
                            removeComment={comment_id => deleteCommentHandler(comment_id)}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        );
    };
    const deleteCommentHandler = comment_id => {
        console.log(comment_id);
        const newVideoComments = VideoComments;
        // deleteVideoComment(comment_id)
        //     .then(res => console.log(res))
        //     .then(err => console.log(err));
        console.log(newVideoComments, 'new');
        function arrayRemove(arr, value) {
            return arr.filter(function (ele) {
                return ele.id != value;
            });
        }
        const result = arrayRemove(newVideoComments, comment_id);
        console.log(result, 'result');
        // const removeComment = newVideoComments.findIndex(comment => comment.id === comment_id);
        // console.log(newVideoComments.splice(removeComment, 1));
        // VideoComments.splice(removeComment, 1);
        //     console.log(VideoComments);
        setVideoComments(result);
    };

    const onasdHandelr = () => {
        console.log(VideoComments, 'gg');
    };
    const addCommentHandler = newcomment => {
        console.log(newcomment);
        setVideoComments([...VideoComments, newcomment]);
    };

    return (
        <div>
            <Row>
                <Col xs={12} md={8} lg={8} xl={8}>
                    {VideoDetail.data === undefined ? (
                        console.log('yet')
                    ) : (
                        <div>
                            <ShowVideo classId={VideoDetail.data.id} />
                            <button onClick={onasdHandelr}>asdasd</button>
                        </div>
                    )}
                </Col>
                <Col xs={12} md={4} lg={4} xl={4}>
                    {VideoDetail.data === undefined ? (
                        console.log('yet')
                    ) : (
                        <VideoInfo video={VideoDetail.data} like={VideoDetail.like_status} />
                    )}
                    {VideoDetail.data === undefined ? (
                        console.log('yet')
                    ) : (
                        <VideoCommentInput
                            VideoComments={VideoComments}
                            VideoDetail={VideoDetail}
                            addComment={comment => addCommentHandler(comment)}
                        />
                    )}

                    {VideoComments.length === 0 ? (
                        <div>
                            <p>아직 댓글이 없어요 ㅠㅠ</p>
                        </div>
                    ) : (
                        renderComment()
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default WatchPage;
