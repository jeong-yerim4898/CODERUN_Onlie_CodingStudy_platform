import React from 'react';
import './ClassPage.css';
import 'antd/dist/antd.css';
import { Row, Col, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import ClassList from './ClassList';

function ClassPage() {
    const AlgoSubjects = [
        {
            id: 1,
            name: '그리디',
        },
        {
            id: 2,
            name: '구현',
        },
        {
            id: 3,
            name: 'DFS/ BFS',
        },
        {
            id: 4,
            name: '정렬',
        },
        {
            id: 5,
            name: '이진탐색',
        },
        {
            id: 6,
            name: 'DP',
        },
        {
            id: 7,
            name: '그래프',
        },
        {
            id: 8,
            name: '최단경로',
        },
    ];

    const CsSubjects = [
        {
            id: 1,
            name: '자료구조',
        },
        {
            id: 2,
            name: '알고리즘',
        },
        {
            id: 3,
            name: '데이터베이스',
        },
        {
            id: 4,
            name: '네트워크',
        },
        {
            id: 5,
            name: 'OS',
        },
        {
            id: 6,
            name: '컴퓨터구조',
        },
        {
            id: 7,
            name: '기타',
        },
    ];

    const Algos = AlgoSubjects.map((subject, index) => {
        return <Menu.Item key={index}>{subject.name}</Menu.Item>;
    });
    const Css = CsSubjects.map((subject, index) => {
        return <Menu.Item key={index + 8}>{subject.name}</Menu.Item>;
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
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Computer Science">
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
