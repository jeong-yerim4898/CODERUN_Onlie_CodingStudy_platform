import React from 'react';
import { Input } from 'antd';
import { StyledInput } from '../VideoUploadStyled';

function VideoContent(props) {
    const { TextArea } = Input;

    const onChange = e => {
        props.handlerContent(e.target.value);
    };
    return (
        <div>
            <StyledInput
                showCount
                maxLength={props.maxlength}
                onChange={onChange}
                rows={props.row}
            />
            <TextArea showCount maxLength={props.maxlength} onChange={onChange} rows={props.row} />
        </div>
    );
}

export default VideoContent;
