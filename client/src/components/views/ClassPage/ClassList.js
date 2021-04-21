import React from 'react';
import { Space, Button, Input, Card, Row, Col } from 'antd';
import './ClassList.css';

function ClassList() {
    const { Meta } = Card;
    const { Search } = Input;
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
    const renderCards = Classes.map((product, index) => {
        return (
            // <a className="Class-atag" href={'/videoclass/detail/' + product.id} key={index}>
            <Col className="colcard" span={5}>
                <Card
                    hoverable
                    cover={
                        <img
                            alt="example"
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                        />
                    }
                    title={product.title}
                    bordered={false}
                >
                    {product.nickname}
                </Card>
            </Col>
            // </a>
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
                    // onSearch={onSearch}
                />
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
            </Space>
            <Row className="board" gutter={16}>
                {renderCards}
            </Row>
        </div>
    );
}

export default ClassList;
