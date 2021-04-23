import React from 'react';
import './ClassPage.css';
import 'antd/dist/antd.css';
import { Row, Col, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import ClassList from './ClassList';

function ClassPage() {
    const AlgoSubjects = [
        {
            _id: 1,
            name: '자료구조',
        },
        {
            _id: 2,
            name: 'DFS',
        },
        {
            _id: 3,
            name: 'BFS',
        },
        {
            _id: 4,
            name: '그래프',
        },
        {
            _id: 5,
            name: '정수론',
        },
        {
            _id: 6,
            name: '난수발생',
        },
    ];

    const CsSubjects = [
        {
            _id: 1,
            name: '계산이론',
        },
        {
            _id: 2,
            name: '컴파일러',
        },
        {
            _id: 3,
            name: '분산처리',
        },
        {
            _id: 4,
            name: '컴퓨터 구조',
        },
        {
            _id: 5,
            name: '인공지능',
        },
        {
            _id: 6,
            name: '통신',
        },
    ];

    const Algos = AlgoSubjects.map((subject, index) => {
        return <Menu.Item key={index}>{subject.name}</Menu.Item>;
    });
    const Css = CsSubjects.map((subject, index) => {
        return <Menu.Item key={index}>{subject.name}</Menu.Item>;
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
                            {Algos}
                        </SubMenu>
                    </Menu>
                    <Menu
                        // onClick={this.handleClick}
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Computer Science">
                            {Css}
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
