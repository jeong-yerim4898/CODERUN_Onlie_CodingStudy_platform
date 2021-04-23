import React, { useEffect, useState } from 'react';
import { Space, Input, Card, Row, Col } from 'antd';
import './ClassList.css';
import LanguageBox from './Sections/LanguageBox';
import { languages } from './Sections/Languages';

function ClassList() {
    const [Filters, setFilters] = useState({
        languages: [],
    });
    const [Skip, setSkip] = useState(0);
    // const [Limit, setLimit] = useState(8);
    const { Meta } = Card;
    const { Search } = Input;

    useEffect(() => {
        let body = {
            skip: Skip,
            // limit: Limit,
        };
        // getProducts(body);
    }, []);

    const Classes = [
        { title: 'what u code do', nickname: 'paccoding' },
        { title: 'what u code do2', nickname: 'paccoding2' },
        { title: 'what u code do2', nickname: 'paccoding2' },
        { title: 'what u code do4', nickname: 'paccoding3' },
        { title: 'what u code do4', nickname: 'paccoding3' },
        { title: 'what u code do4', nickname: 'paccoding3' },
        { title: 'what u code do4', nickname: 'paccoding3' },
        { title: 'what u code do4', nickname: 'paccoding3' },
        { title: 'what u code do4', nickname: 'paccoding3' },
        { title: 'what u code do4', nickname: 'paccoding3' },
    ];
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

    const showFilteredResults = filters => {
        let body = {
            skip: 0,
            // limit: Limit,
            filters: filters,
        };

        // getProducts(body);
        setSkip(0);
    };

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };

        newFilters[category] = filters;

        console.log('filters', filters);

        showFilteredResults(newFilters);
        setFilters(newFilters);
    };

    return (
        <div>
            <Space size={2}>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    // onSearch={onSearch}
                />
                <LanguageBox
                    list={languages}
                    handleFilters={filters => handleFilters(filters, 'languages')}
                />
            </Space>
            <Row className="board">{renderCards}</Row>
        </div>
    );
}

export default ClassList;
