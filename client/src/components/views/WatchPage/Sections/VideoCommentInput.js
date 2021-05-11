import React, { useState } from 'react';
import { Input, Button } from 'antd';
//api
import { postVideoComment } from '_api/Video';

function VideoCommentInput(props) {
    const video_id = props.VideoDetail.data.id;
    const [CommentContent, setCommentContent] = useState('');
    const [VideoComments, setVideoComments] = useState([...props.VideoComments]);

    const changeContent = e => {
        setCommentContent(e.currentTarget.value);
    };
    const sendVideoComment = e => {
        if (CommentContent.length !== 0) {
            const body = { video_id: video_id, content: CommentContent };
            postVideoComment(body)
                .then(res => {
                    props.addComment(res.data.data);
                    setCommentContent('');
                })
                .catch(err => console.log(err));
        } else {
            alert('댓글을 입력해주세요.');
        }
    };

    const EnterComment = e => {
        if (CommentContent.length !== 0) {
            const body = { video_id: video_id, content: CommentContent };
            postVideoComment(body)
                .then(res => {
                    props.addComment(res.data.data);
                    setCommentContent('');
                })
                .catch(err => console.log(err));
        } else {
            alert('댓글을 입력해주세요.');
        }
    };
    return (
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
    );
}

export default VideoCommentInput;
