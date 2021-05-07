import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Input, Button } from 'antd';
import './AddtoPlaylist.js';
import ShowVideo from './Sections/ShowVideo';
import VideoInfo from './Sections/VideoInfo';
import VideoComment from './Sections/VideoComment';

//api
import {
    fetchVideoDetail,
    fetchVideoComments,
    postVideoComment,
    deleteVideoComment,
} from '_api/Video';
import AddtoPlaylist from './AddtoPlaylist.js';

function WatchPage(props) {
    const video_id = props.match.params.id;
    const [VideoDetail, setVideoDetail] = useState({});
    const [VideoComments, setVideoComments] = useState([]);
    const [CommentContent, setCommentContent] = useState('');

    useEffect(() => {
        const videoData = async () => {
            try {
                const res = await fetchVideoDetail(video_id);
                setVideoDetail(res.data);
                const res2 = await fetchVideoComments(video_id);
                setVideoComments(res2.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        videoData();
    }, []);

    const changeContent = e => {
        setCommentContent(e.currentTarget.value);
    };

    const renderComment = VideoComments.map((comment, index) => {
        return (
            <VideoComment
                key={index}
                VideoComment={comment}
                removeComment={comment_id => deleteCommentHandler(comment_id)}
            />
        );
    });

    const deleteCommentHandler = comment_id => {
        deleteVideoComment(comment_id)
            .then(res => console.log(res))
            .then(err => console.log(err));
        const removeComment = VideoComments.findIndex(comment => comment.id === comment_id);
        VideoComments.splice(removeComment, 1);
        setVideoComments([...VideoComments]);
    };

    const sendVideoComment = () => {
        if (CommentContent.length !== 0) {
            const body = { video_id: video_id, content: CommentContent };
            postVideoComment(video_id, body)
                .then(res => {
                    setVideoComments([...VideoComments, res.data.data]);
                    setCommentContent('');
                })
                .catch(err => console.log(err));
        } else {
            alert('댓글을 입력해주세요.');
        }
    };
    const EnterComment = () => {
        if (CommentContent.length !== 0) {
            const body = { video_id: video_id, content: CommentContent };
            postVideoComment(video_id, body)
                .then(res => {
                    setVideoComments([...VideoComments, res.data.data]);
                    setCommentContent('');
                })
                .catch(err => console.log(err));
        } else {
            alert('댓글을 입력해주세요.');
        }
    };
    return (
        <div>
            <Row>
                <Col xs={12} md={8} lg={8} xl={8}>
                    {VideoDetail.data === undefined ? (
                        console.log('yet')
                    ) : (
                        <ShowVideo classId={VideoDetail.data.id} />
                    )}
                </Col>
                <Col xs={12} md={4} lg={4} xl={4}>
                    {VideoDetail.data === undefined ? (
                        console.log('yet')
                    ) : (
                        <VideoInfo video={VideoDetail.data} like={VideoDetail.like_status} />
                    )}
                    <div style={{ display: 'flex' }}>
                        <Input
                            className="comment-input"
                            placeholder="댓글을 입력해주세요."
                            onPressEnter={EnterComment}
                            onChange={changeContent}
                            value={CommentContent}
                        ></Input>
                        <Button onClick={sendVideoComment}>작성</Button>
                    </div>
                    {VideoComments.length === 0 ? (
                        <div>
                            <p>아직 댓글이 없어요 ㅠㅠ</p>
                        </div>
                    ) : (
                        renderComment
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default WatchPage;
