import React from 'react';
import ReactHLS from 'react-hls';
import './ShowVideo.css';
function ShowVideo() {
    const number = 42;
    return (
        <div className="pageboard">
            <ReactHLS
                className="videoarea"
                autoplay={true}
                width={1000}
                height={500}
                url={`https://k4d102.p.ssafy.io/video/${number}`}
            />
        </div>
    );
}

export default ShowVideo;
