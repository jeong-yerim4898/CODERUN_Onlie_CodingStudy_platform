import React, { useEffect, useState } from 'react';
import { Space, Input, Card, Row, Col } from 'antd';
import './ClassList.css';
import LanguageBox from './Sections/LanguageBox';

function ClassList() {
    const [Filters, setFilters] = useState({
        languages: [],
    });
    const [Skip, setSkip] = useState(0);
    // const [Limit, setLimit] = useState(8);

    const { Meta } = Card;
    const { Search } = Input;

    const Classes = [
        {
            title: 'what u code do',
            nickname: 'paccoding',
            algorithm_tag_id: 'DP',
            type: 'C/C++',
        },
        {
            title: 'what u code do2 Java',
            nickname: 'paccoding2',
            algorithm_tag_id: 'DP',
            type: 'Java',
        },
        {
            title: 'what u code do2 Java',
            nickname: 'paccoding2',
            algorithm_tag_id: 'DFS/ BFS',
            type: 'Java',
        },
        {
            title: 'what u code do4 그래프',
            nickname: 'paccoding3',
            algorithm_tag_id: '그래프',
            type: 'C/C++',
        },
        {
            title: 'what u code do4 python 그래프',
            nickname: 'paccoding3',
            algorithm_tag_id: '그래프',
            type: 'python',
        },
        {
            title: 'what u code do4 python 최단경로',
            nickname: 'paccoding3',
            algorithm_tag_id: '최단경로',
            type: 'python',
        },
        {
            title: 'what u code do4 python 최단경로',
            nickname: 'paccoding3',
            algorithm_tag_id: '최단경로',
            type: 'python',
        },
        {
            title: 'what u code do4',
            nickname: 'paccoding3',
            algorithm_tag_id: '그리디',
            type: 'C/C++',
        },
        {
            title: 'what u code do4',
            nickname: 'paccoding3',
            algorithm_tag_id: '그리디',
            type: 'C/C++',
        },
        {
            title: 'what u code do4',
            nickname: 'paccoding3',
            algorithm_tag_id: 'DFS/ BFS',
            type: 'C/C++',
        },
    ];
    // const [Classes, setClasses] = useState(Classses);
    // console.log(Classes);
    const renderCards = Classes.map((classs, index) => {
        return (
            <a href={'/watch/' + index} key={index}>
                <Col className="colcard" span={5}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                            <img
                                alt="example"
                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                            />
                        }
                        title={classs.title}
                        bordered={false}
                    >
                        {classs.nickname}
                    </Card>
                </Col>
            </a>
        );
    });

    return (
        <div>
            <Space size={2}>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{ margin: 5 }}
                    // onSearch={onSearch}
                />
                <LanguageBox />
            </Space>
            <Row className="board">{renderCards}</Row>
        </div>
    );
}

export default ClassList;
