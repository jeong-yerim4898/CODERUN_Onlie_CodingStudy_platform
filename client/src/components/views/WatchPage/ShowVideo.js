import React from 'react';
import ReactHLS from 'react-hls';
import './ShowVideo.css';
function ShowVideo() {
    return (
        <div className="pageboard">
            <ReactHLS
                className="videoarea"
                autoplay={true}
                width={1000}
                height={500}
                url={'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'}
            />
        </div>
    );
}

export default ShowVideo;
