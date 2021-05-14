import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import './AddtoPlaylist.js';
import ShowVideo from './Sections/ShowVideo';
import VideoInfomation from './Sections/VideoInfomation';

//api
import { fetchVideoDetail, fetchVideoComments } from '_api/Video';
import AddtoPlaylist from './AddtoPlaylist.js';

function WatchPage(props) {
    const getParams = props.location?.state?.playlistId;
    const video_id = props.match.params.id;
    const [VideoDetail, setVideoDetail] = useState({});
    const [VideoComments, setVideoComments] = useState([]);

    useEffect(() => {
        const videoData = async () => {
            try {
                const res = await fetchVideoDetail(video_id);
                setVideoDetail(res.data);
                const res2 = await fetchVideoComments(video_id);

                setVideoComments(res2.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        videoData();
    }, []);

    return (
        <div>
            <Row>
                <Col xs={12} md={8} lg={8} xl={8}>
                    {VideoDetail.data === undefined ? (
                        console.log('yet')
                    ) : (
                        <div>
                            <ShowVideo classId={video_id} />
                        </div>
                    )}
                </Col>
                <Col xs={12} md={4} lg={4} xl={4}>
                    {VideoDetail.data === undefined ? (
                        console.log('yet')
                    ) : (
                        <VideoInfomation
                            VideoListId={getParams}
                            VideoDetail={VideoDetail}
                            VideoComments={VideoComments}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default WatchPage;
