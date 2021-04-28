import React, { useState, useEffect } from 'react';
import VideoImageUpload from './Sections/VideoImgUpoload';
import VideoContent from './Sections/VideoContent';
import VideoTag from './Sections/VideoTag';

// api
import { fetchLanguageTag, fetchAlgorithmTag, fetchCSTag } from '_api/Tag';

import { Progress, Row, Col } from 'antd';
import './VideoUpload.css';

function VideoUpload() {
    const [Languages, setLanguages] = useState([]);
    const [Algorithms, setAlgorithms] = useState([]);
    const [CSes, setCSes] = useState([]);

    useEffect(() => {
        const TagData = async () => {
            try {
                const res1 = await fetchLanguageTag();
                setLanguages(res1.data.data);
                const res2 = await fetchAlgorithmTag();
                setAlgorithms(res2.data.data);

                // const res3 = await fetchCSTag();
                // setCSes(res3.data);
            } catch (err) {
                console.log(err);
            }
        };
        TagData();
    }, []);

    const renderLanguageTag = Languages.map((language, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag tag={language.language_name} tag_id={language.id} />
                </Col>
            </div>
        );
    });
    const renderAlgorithmTag = Algorithms.map((algorithm, index) => {
        return (
            <div>
                <Col lg={4} md={8} xs={24} key={index}>
                    <VideoTag tag={algorithm.algorithm_name} tag_id={algorithm.id} />
                </Col>
            </div>
        );
    });

    return (
        <div class="page">
            <div class="progress">
                <Progress percent={50} status="active" />
            </div>
            <div class="video-preview">
                <VideoImageUpload />
            </div>
            <div class="video-content">
                <VideoContent />
                <VideoContent />
            </div>
            <div class="video-tag">
                <div>
                    <h2>언어(1개)</h2>
                    <Row gutter={[16, 16]}>{renderLanguageTag}</Row>
                </div>
                <div>
                    <h2>알고리즘(복수가능)</h2>
                    <Row gutter={[16, 16]}>{renderAlgorithmTag}</Row>
                </div>
            </div>
        </div>
    );
}

export default VideoUpload;
