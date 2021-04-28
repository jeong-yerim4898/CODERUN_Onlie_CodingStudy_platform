import React from 'react';
import { Input } from 'antd';

function VideoContent() {
    const { TextArea } = Input;
    const onChange = e => {
        console.log('Change:', e.target.value);
    };
    return (
        <div>
            <TextArea showCount maxLength={100} onChange={onChange} />
        </div>
    );
}

export default VideoContent;
