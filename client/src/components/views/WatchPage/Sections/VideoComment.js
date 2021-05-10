import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { updateVideoComment } from '_api/Video';

function VideoComment(props) {
    let user = useSelector(state => state.user);
    const [comment, setcomment] = useState(props.VideoComment.content);
    const [commentUpdate, setcommentUpdate] = useState('');
    const deleteComment = () => {
        props.removeComment(props.VideoComment.id);
    };
    const handlerUpdate = e => {
        setcommentUpdate(e.currengtTarget.value);
    };
    const updateComment = () => {
        const updateBtn = document.getElementsByClassName(`${props.VideoComment.id}comment-update`);
        const content = document.getElementsByClassName(`${props.VideoComment.id}comment-content`);
        const updateIcon = document.getElementsByClassName(
            `${props.VideoComment.id}comment-update-icon`,
        );
        const deleteIcon = document.getElementsByClassName(
            `${props.VideoComment.id}comment-delete-icon`,
        );
        updateBtn[0].classList.remove('hidden');
        content[0].classList.add('hidden');
        updateIcon[0].classList.add('hidden');
        deleteIcon[0].classList.add('hidden');
    };

    const sendCommentUpdate = () => {
        const updateBtn = document.getElementsByClassName(`${props.VideoComment.id}comment-update`);
        const content = document.getElementsByClassName(`${props.VideoComment.id}comment-content`);
        const updateIcon = document.getElementsByClassName(
            `${props.VideoComment.id}comment-update-icon`,
        );
        const deleteIcon = document.getElementsByClassName(
            `${props.VideoComment.id}comment-delete-icon`,
        );
        const body = { video_comment_id: props.VideoComment.id, content: commentUpdate };
        updateVideoComment(body)
            .then(res => {
                console.log(res.data);
                setcomment(commentUpdate);
                updateBtn[0].classList.add('hidden');
                content[0].classList.remove('hidden');
                updateIcon[0].classList.remove('hidden');
                deleteIcon[0].classList.remove('hidden');
            })
            .catch(err => console.log(err));
        setcomment(commentUpdate);
    };
    const cancleCommentUpdate = () => {
        const updateBtn = document.getElementsByClassName(`${props.VideoComment.id}comment-update`);

        const updateIcon = document.getElementsByClassName(
            `${props.VideoComment.id}comment-update-icon`,
        );
        const deleteIcon = document.getElementsByClassName(
            `${props.VideoComment.id}comment-delete-icon`,
        );
        const content = document.getElementsByClassName(`${props.VideoComment.id}comment-content`);
        updateBtn[0].classList.add('hidden');
        content[0].classList.remove('hidden');
        updateIcon[0].classList.remove('hidden');
        deleteIcon[0].classList.remove('hidden');
    };
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <img
                    src={props.VideoComment.user.profile}
                    style={{ height: `50px`, borderRadius: '50%' }}
                />
                <div style={{ width: '60%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>{props.VideoComment.user.name}</h4>
                        {props.VideoComment.user.id == user.login.user.id ? (
                            <div>
                                <EditOutlined
                                    className={props.VideoComment.id + 'comment-update-icon'}
                                    onClick={updateComment}
                                />
                                <CloseOutlined
                                    className={props.VideoComment.id + 'comment-delete-icon'}
                                    onClick={deleteComment}
                                />
                                <div
                                    className={props.VideoComment.id + 'comment-update' + ' hidden'}
                                >
                                    <Input onChange={handlerUpdate} />
                                    <Button onClick={sendCommentUpdate}>수정완료</Button>
                                    <Button onClick={cancleCommentUpdate}>취소</Button>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <p className={props.VideoComment.id + 'comment-content'}>{comment}</p>
                </div>
            </div>
        </div>
    );
}

export default VideoComment;
