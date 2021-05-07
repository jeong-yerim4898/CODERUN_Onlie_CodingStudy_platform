import React from 'react';
import ReactHLS from 'react-hls';
import './ShowVideo.css';
import { SERVER } from 'Config.js';
function ShowVideo(props) {
    const classId = props.classId;
    return (
        <div className="pageboard">
            <ReactHLS
                className="videoarea"
                autoplay={true}
                width={1000}
                height={500}
                url={`${SERVER}/video/${classId}_VIDEO.m3u8`}
            />
        </div>
    );
}

export default ShowVideo;
