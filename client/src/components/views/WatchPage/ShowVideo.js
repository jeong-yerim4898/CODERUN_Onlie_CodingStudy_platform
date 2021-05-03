import React from 'react';
import ReactHLS from 'react-hls';
import './ShowVideo.css';
function ShowVideo() {
    const video_idx = 4;
    return (
        <div className="pageboard">
            <ReactHLS
                className="videoarea"
                autoplay={true}
                width={1000}
                height={500}
                url={`https://k4d102.p.ssafy.io/video/${video_idx}_VIDEO.m3u8`}
            />
        </div>
    );
}

export default ShowVideo;
