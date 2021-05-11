import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ClassPage.css';
import 'antd/dist/antd.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import { fetchCSTag, fetchAlgorithmTag, fetchLanguageTag } from '_api/Tag.js';

import {
    fetchFilteredVideoList,
    fetchLoginedFilteredVideoList,
    fetchAlgoFilteredVideoList,
    fetchLoginedAlgoFilteredVideoList,
    fetchCsFilteredVideoList,
    fetchLoginedCsFilteredVideoList,
    fetchAlgoLangFilteredVideoList,
    fetchLoginedAlgoLangFilteredVideoList,
} from '_api/Video.js';

import { Row, Col, Button, Card } from 'react-bootstrap';
import { Menu } from 'antd';
import { ApartmentOutlined, CalculatorOutlined } from '@ant-design/icons';

function ClassPage() {
    let user = useSelector(state => state.user);

    const [Algos, setAlgos] = useState([]);
    const [Css, setCss] = useState([]);
    const [languages, setlanguages] = useState([]);

    const [Algo, setAlgo] = useState(0);
    const [Cs, setCs] = useState(0);
    const [Language, setLanguage] = useState(0);
    const [Page, setPage] = useState(1);
    const [Classes, setClasses] = useState([]);

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
        fetchLanguageTag().then(res => {
            // console.log(res.data.data);
            const languageTag = res.data.data;
            // console.log(languageTag);
            setlanguages(languageTag);
        });
        const user_id = user?.login?.user?.id;
        const count = Page;
        if (user_id) {
            fetchLoginedFilteredVideoList(user_id, count).then(res => {
                console.log('success get');
                console.log(res.data.data, 'userEffect');
                setClasses(res.data.data);
            });
        } else {
            fetchFilteredVideoList(count).then(res => {
                console.log('success get');
                console.log(res.data.data, 'userEffect');
                setClasses(res.data.data);
            });
        }
    }, []);

    const onAlgoHandler = num => {
        setCs(0);
        setAlgo(num);
        const count = Page;
        const algorithm_tag_id = num;
        const user_id = user?.login?.user?.id;
        if (user_id) {
            fetchLoginedAlgoFilteredVideoList(algorithm_tag_id, user_id, count).then(res => {
                console.log(res.data.data, 'algo');
                setClasses(res.data.data);
            });
        } else {
            fetchAlgoFilteredVideoList(algorithm_tag_id, count).then(res => {
                console.log(res.data.data, 'algo');
                setClasses(res.data.data);
            });
        }
    };

    const onCsHandler = num => {
        setAlgo(0);
        setCs(num);
        const count = Page;
        const subject_tag_id = num;
        const user_id = user?.login?.user?.id;
        if (user_id) {
            fetchLoginedCsFilteredVideoList(subject_tag_id, user_id, count).then(res => {
                console.log(res.data.data, 'Cs');
                setClasses(res.data.data);
            });
        } else {
            fetchCsFilteredVideoList(subject_tag_id, count).then(res => {
                console.log(res.data.data, 'Cs');
                setClasses(res.data.data);
            });
        }
    };

    const onLanguageHandler = num => {
        setLanguage(num);
        const count = Page;
        const user_id = user?.login?.user?.id;
        if (user_id) {
            fetchLoginedAlgoLangFilteredVideoList(Algo, num, user_id, count).then(res => {
                console.log(res.data.data, 'language');
                setClasses(res.data.data);
                console.log(Classes, 'asdasd');
            });
        } else {
            fetchAlgoLangFilteredVideoList(Algo, num, count).then(res => {
                console.log(res.data.data, 'language');
                setClasses(res.data.data);
                console.log(Classes, 'asdasd');
            });
        }
    };
    const onNextHandler = () => {
        setPage(Page + 1);
        const user_id = user?.login?.user?.id;
        console.log(Page);
        if (user_id) {
            if (Algo) {
                if (Language) {
                    fetchLoginedAlgoLangFilteredVideoList(Algo, Language, user_id, Page).then(
                        res => {
                            console.log(res.data.data, 'language');
                            setClasses(res.data.data);
                            console.log(Classes, 'asdasd');
                        },
                    );
                } else {
                    fetchLoginedAlgoFilteredVideoList(Algo, user_id, Page).then(res => {
                        console.log(res.data.data, 'algo');
                        setClasses(res.data.data);
                    });
                }
            } else if (Cs) {
                fetchLoginedCsFilteredVideoList(Cs, user_id, Page).then(res => {
                    console.log(res.data.data, 'Cs');
                    setClasses(res.data.data);
                });
            } else {
                fetchFilteredVideoList(Page).then(res => {
                    console.log('success get');
                    console.log(res.data.data, 'userEffect');
                    setClasses(res.data.data);
                });
            }
        } else {
            if (Algo) {
                if (Language) {
                    fetchAlgoLangFilteredVideoList(Algo, Language, Page).then(res => {
                        console.log(res.data.data, 'language');
                        setClasses(res.data.data);
                        console.log(Classes, 'asdasd');
                    });
                } else {
                    fetchAlgoFilteredVideoList(Algo, Page).then(res => {
                        console.log(res.data.data, 'algo');
                        setClasses(res.data.data);
                    });
                }
            } else if (Cs) {
                fetchCsFilteredVideoList(Cs, Page).then(res => {
                    console.log(res.data.data, 'Cs');
                    setClasses(res.data.data);
                });
            } else {
                fetchFilteredVideoList(Page).then(res => {
                    console.log('success get');
                    console.log(res.data.data, 'userEffect');
                    setClasses(res.data.data);
                });
            }
        }
    };

    const onPreviousHandler = () => {
        setPage(Page - 1);
        const user_id = user?.login?.user?.id;
        console.log(Page);
        if (user_id) {
            if (Algo) {
                if (Language) {
                    fetchLoginedAlgoLangFilteredVideoList(Algo, Language, user_id, Page).then(
                        res => {
                            console.log(res.data.data, 'language');
                            setClasses(res.data.data);
                            console.log(Classes, 'asdasd');
                        },
                    );
                } else {
                    fetchLoginedAlgoFilteredVideoList(Algo, user_id, Page).then(res => {
                        console.log(res.data.data, 'algo');
                        setClasses(res.data.data);
                    });
                }
            } else if (Cs) {
                fetchLoginedCsFilteredVideoList(Cs, user_id, Page).then(res => {
                    console.log(res.data.data, 'Cs');
                    setClasses(res.data.data);
                });
            } else {
                fetchLoginedFilteredVideoList(user_id, Page).then(res => {
                    console.log('success get');
                    console.log(res.data.data, 'userEffect');
                    setClasses(res.data.data);
                });
            }
        } else {
            if (Algo) {
                if (Language) {
                    fetchAlgoLangFilteredVideoList(Algo, Language, Page).then(res => {
                        console.log(res.data.data, 'language');
                        setClasses(res.data.data);
                        console.log(Classes, 'asdasd');
                    });
                } else {
                    fetchAlgoFilteredVideoList(Algo, Page).then(res => {
                        console.log(res.data.data, 'algo');
                        setClasses(res.data.data);
                    });
                }
            } else if (Cs) {
                fetchCsFilteredVideoList(Cs, Page).then(res => {
                    console.log(res.data.data, 'Cs');
                    setClasses(res.data.data);
                });
            } else {
                fetchFilteredVideoList(Page).then(res => {
                    console.log('success get');
                    console.log(res.data.data, 'userEffect');
                    setClasses(res.data.data);
                });
            }
        }
    };

    const renderAlgo = Algos.map((Algo, index) => {
        return (
            <Menu.Item className="classmenu" onClick={() => onAlgoHandler(Algo.id)} key={index}>
                {Algo.algorithm_name}
            </Menu.Item>
        );
    });
    const renderCs = Css.map((Cs, index) => {
        return (
            <Menu.Item
                className="classmenu"
                onClick={() => onCsHandler(Cs.id)}
                key={index + Algos.length}
            >
                {Cs.subject_name}
            </Menu.Item>
        );
    });
    const renderButton = languages.map((languagetag, index) => {
        if (Algo) {
            return (
                <Button
                    className="algoButton"
                    onClick={() => onLanguageHandler(languagetag.id)}
                    key={index}
                >
                    {languagetag.language_name}
                </Button>
            );
        } else {
            return <div></div>;
        }
    });
    const renderCards = Classes.map((classs, index) => {
        return (
            <a className="classAtag" href={'/watch/' + classs.id} key={index}>
                <Col className="colcard" span={5}>
                    <Card className="shadow classCard" style={{ width: 240, height: 320 }}>
                        <Card.Img
                            className="classImg"
                            variant="top"
                            src={classs.thumbnail}
                            style={{ height: 180 }}
                        />
                        <Card.Body>
                            <Card.Title
                                className="classTitle"
                                style={{ fontFamily: 'payboocMedium' }}
                            >
                                {classs.title}
                            </Card.Title>
                            <Card.Text>{classs.user.name}</Card.Text>
                            {classs.likestatus ? (
                                <Card.Text>
                                    <FontAwesomeIcon style={{ color: '#1ee494' }} icon={fasHeart} />{' '}
                                    {classs.likecnt}
                                </Card.Text>
                            ) : (
                                <Card.Text>
                                    <FontAwesomeIcon style={{ color: '#1ee494' }} icon={farHeart} />{' '}
                                    {classs.likecnt}
                                </Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </a>
        );
    });

    const { SubMenu } = Menu;
    return (
        <div>
            <Row>
                <Col md={2}>
                    <Menu
                        // onClick={this.handleClick}
                        style={{ color: '#94d3ac' }}
                        // defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1', 'sub2']}
                        mode="inline"
                    >
                        <SubMenu
                            key="sub1"
                            style={{ color: '#94d3ac' }}
                            icon={<CalculatorOutlined />}
                            title="Algorithm"
                        >
                            {renderAlgo}
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            style={{ color: '#94d3ac' }}
                            icon={<ApartmentOutlined />}
                            title="Computer Science"
                        >
                            {renderCs}
                        </SubMenu>
                    </Menu>
                </Col>
                <Col md={10}>
                    {renderButton}
                    {/* <Space size={2}> */}
                    <Row className="cardBoard">{renderCards}</Row>
                    {/* </Space> */}
                    <br></br>
                    {Page > 1 ? (
                        <Button variant="outline-success" onClick={onPreviousHandler}>
                            이전페이지
                        </Button>
                    ) : (
                        <Button
                            variant="outline-success"
                            disabled={true}
                            onClick={onPreviousHandler}
                        >
                            이전페이지
                        </Button>
                    )}{' '}
                    {Classes.count === 12 ? (
                        <Button variant="outline-success" onClick={onNextHandler}>
                            다음페이지
                        </Button>
                    ) : (
                        <Button variant="outline-success" disabled={true} onClick={onNextHandler}>
                            다음페이지
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default ClassPage;
