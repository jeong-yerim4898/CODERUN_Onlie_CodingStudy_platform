import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { updateVideoComment } from '_api/Video';

function VideoComment(props) {
    let user = useSelector(state => state.user);
    const [comment, setcomment] = useState('');
    const [commentUpdate, setcommentUpdate] = useState('');

    useEffect(() => {
        setcomment(props.Videocomment.content);
    }, [props.Videocomment.content]);

    const deleteComment = () => {
        props.removeComment(props.Videocomment.id);
    };

    const handlerUpdate = e => {
        setcommentUpdate(e.currentTarget.value);
    };
    const updateComment = () => {
        const updateBtn = document.getElementsByClassName(`${props.Videocomment.id}comment-update`);
        const content = document.getElementsByClassName(`${props.Videocomment.id}comment-content`);
        const updateIcon = document.getElementsByClassName(
            `${props.Videocomment.id}comment-update-icon`,
        );
        const deleteIcon = document.getElementsByClassName(
            `${props.Videocomment.id}comment-delete-icon`,
        );
        updateBtn[0].classList.remove('hidden');
        content[0].classList.add('hidden');
        updateIcon[0].classList.add('hidden');
        deleteIcon[0].classList.add('hidden');
    };

    const sendCommentUpdate = () => {
        const updateBtn = document.getElementsByClassName(`${props.Videocomment.id}comment-update`);
        const content = document.getElementsByClassName(`${props.Videocomment.id}comment-content`);
        const updateIcon = document.getElementsByClassName(
            `${props.Videocomment.id}comment-update-icon`,
        );
        const deleteIcon = document.getElementsByClassName(
            `${props.Videocomment.id}comment-delete-icon`,
        );
        const body = { video_comment_id: props.Videocomment.id, content: commentUpdate };
        updateVideoComment(body)
            .then(res => {
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
        const updateBtn = document.getElementsByClassName(`${props.Videocomment.id}comment-update`);
        const updateIcon = document.getElementsByClassName(
            `${props.Videocomment.id}comment-update-icon`,
        );
        const deleteIcon = document.getElementsByClassName(
            `${props.Videocomment.id}comment-delete-icon`,
        );
        const content = document.getElementsByClassName(`${props.Videocomment.id}comment-content`);
        updateBtn[0].classList.add('hidden');
        content[0].classList.remove('hidden');
        updateIcon[0].classList.remove('hidden');
        deleteIcon[0].classList.remove('hidden');
    };
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <img
                    src={props.Videocomment.user.profile}
                    style={{ height: `50px`, width: '50px', borderRadius: '50%' }}
                />
                <div style={{ width: '60%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4>{props.Videocomment.user.name}</h4>
                        {props.Videocomment.user.id == user.login.user.id ? (
                            <div>
                                <EditOutlined
                                    className={props.Videocomment.id + 'comment-update-icon'}
                                    onClick={updateComment}
                                />
                                <CloseOutlined
                                    className={props.Videocomment.id + 'comment-delete-icon'}
                                    onClick={deleteComment}
                                />
                                <div
                                    className={props.Videocomment.id + 'comment-update' + ' hidden'}
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

                    <p className={props.Videocomment.id + 'comment-content'}>{comment}</p>
                </div>
            </div>
        </div>
    );
}

export default VideoComment;
