import React, { useState, useEffect } from 'react';

import { ListGroup, Row, Col, InputGroup, FormControl, Button, Image } from 'react-bootstrap';
import { useHistory } from 'react-router';

import { listArticle, initialListArticle } from '_api/Board.js';

function CommunityList() {
    const history = useHistory();
    const [ListData, setListData] = useState([]);

    const [SearchData, setSearchData] = useState('');
    const [PageCount, setPageCount] = useState(1);

    useEffect(() => {
        initialListArticle(PageCount).then(res => {
            console.log(res.data.data);
            setListData(res.data.data);
        });
    }, []);

    const onSearchDataHandler = event => {
        setSearchData(event.currentTarget.value);
        listArticle(PageCount, event.currentTarget.value).then(res => {
            console.log(res.data.data);
            setListData(res.data.data);
        });
    };
    const onSearchHandler = () => {
        listArticle(PageCount, SearchData).then(res => {
            setListData(res.data.data);
        });
    };
    const onNextHandler = () => {
        setPageCount(PageCount + 1);
        console.log(PageCount);
        if (SearchData) {
            listArticle(PageCount, SearchData).then(res => {
                console.log(res.data.data);
                setListData(res.data.data);
            });
        } else {
            initialListArticle(PageCount).then(res => {
                console.log(res.data.data, 'initialListArticlenext');
                setListData(res.data.data);
            });
        }
    };
    const onPreviousHandler = () => {
        setPageCount(PageCount - 1);
        console.log(PageCount);
        if (SearchData) {
            listArticle(PageCount, SearchData).then(res => {
                console.log(res.data.data);
                setListData(res.data.data);
            });
        } else {
            initialListArticle(PageCount).then(res => {
                console.log(res.data.data, 'initialListArticlepre');
                setListData(res.data.data);
            });
        }
    };
    const onArticleHandler = num => {
        history.push(`/detail/${num}`);
    };
    const RenderList = ListData.map((data, index) => {
        return (
            <a href={'/community/detail/' + data.Board.id} key={index}>
                <ListGroup horizontal={true}>
                    <ListGroup.Item>
                        <Image src={data.profile} style={{ width: 50 }} roundedCircle></Image>
                        {data.name}
                    </ListGroup.Item>
                    <ListGroup.Item>{data.Board.content}</ListGroup.Item>
                </ListGroup>
            </a>
        );
    });
    return (
        <div>
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="검색어를 입력하세요"
                            onChange={onSearchDataHandler}
                        />
                    </InputGroup>
                    {RenderList}
                    {PageCount > 1 ? (
                        <Button variant="warning" onClick={onPreviousHandler}>
                            이전페이지
                        </Button>
                    ) : (
                        <Button variant="warning" disabled={true} onClick={onPreviousHandler}>
                            이전페이지
                        </Button>
                    )}
                    {ListData.count === 10 ? (
                        <Button variant="info" onClick={onNextHandler}>
                            다음페이지
                        </Button>
                    ) : (
                        <Button variant="info" disabled={true} onClick={onNextHandler}>
                            다음페이지
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default CommunityList;
