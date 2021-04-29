import React, { useState, useEffect } from 'react';

import './ClassPage.css';
import 'antd/dist/antd.css';

import { fetchCSTag, fetchAlgorithmTag } from '_api/Tag.js';

import { Row, Col, Menu, Button } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import ClassList from './ClassList';

function ClassPage() {
    const [Algos, setAlgos] = useState([]);
    const [Css, setCss] = useState([]);

    useEffect(() => {
        fetchAlgorithmTag().then(res => {
            console.log('algo', res.data.data);
            const algoTag = res.data.data;
            // console.log(languageTag);
            setAlgos(algoTag);
        });
        fetchCSTag().then(res => {
            console.log('cs', res.data.data);
            const csTag = res.data.data;
            // console.log(languageTag);
            setCss(csTag);
        });
    }, []);
    const renderAlgo = Algos.map((Algo, index) => {
        return <Menu.Item key={index}>{Algo.algorithm_name}</Menu.Item>;
    });
    const renderCs = Css.map((Cs, index) => {
        return <Menu.Item key={index + Algos.length}>{Cs.subject_name}</Menu.Item>;
    });

    const { SubMenu } = Menu;
    return (
        <div className="pageboard">
            <Row>
                <Col className="colpage" span={4}>
                    <Menu
                        // onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Algorithm">
                            {renderAlgo}
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Computer Science">
                            {renderCs}
                        </SubMenu>
                    </Menu>
                </Col>
                <Col className="colpage" span={20}>
                    <ClassList />
                </Col>
            </Row>
        </div>
    );
}

export default ClassPage;
