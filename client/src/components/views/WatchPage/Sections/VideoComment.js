import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { deleteVideoComment } from '_api/Video';

function VideoComment(props) {
    const deleteComment = () => {
        props.removeComment(props.VideoComment.id);
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
                        <CloseOutlined onClick={deleteComment} />
                    </div>
                    <p>{props.VideoComment.content}</p>
                </div>
            </div>
        </div>
    );
}

export default VideoComment;
