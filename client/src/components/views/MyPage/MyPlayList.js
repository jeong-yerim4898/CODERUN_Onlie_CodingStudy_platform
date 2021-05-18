import React, { useState, useEffect } from 'react';
import { SERVER } from 'Config.js';
import { useHistory } from 'react-router-dom';
import {
    createPlaylist,
    readPlaylist,
    editPlaylist,
    deletePlaylist,
    watchPlaylist,
    fetchPlaylist,
} from '_api/Playlist.js';
import { ListGroup, Button, Form, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MyPlayList(props) {
    const history = useHistory();
    const [Playlists, setPlaylists] = useState([]);
    const [Playlist, setPlaylist] = useState([]);
    const [updatePlaylist, setupdatePlaylist] = useState('');
    const [UpdateNum, setUpdateNum] = useState(null);
    const video_list_id = UpdateNum;

    useEffect(() => {
        readPlaylist().then(res => {
            setPlaylists(res.data.data);
        });
    }, []);

    const playlistHandler = e => {
        setPlaylist(e.currentTarget.value);
    };

    const createPlaylistHandler = e => {
        e.preventDefault();
        console.log(Playlist);
        if (!Playlist) {
            return alert('제목을 입력해 주셔야 합니다.');
        }
        const body = {
            title: Playlist,
        };
        console.log(body);
        createPlaylist(body).then(res => {
            readPlaylist().then(res => {
                setPlaylists(res.data.data);
            });
        });
    };

    const onDeleteHander = idx => {
        deletePlaylist(idx).then(res => {
            readPlaylist().then(res => {
                setPlaylists(res.data.data);
            });
        });
    };

    const onUpdateHander = idx => {
        setUpdateNum(idx);
    };

    const onUpdatePlaylistHander = event => {
        const body = {
            video_list_id: video_list_id,
            title: updatePlaylist,
        };
        console.log(body);
        editPlaylist(body).then(res => {
            readPlaylist().then(res => {
                setPlaylists(res.data.data);
                setUpdateNum(null);
            });
        });
    };

    const onPlaylistChangehandler = e => {
        setupdatePlaylist(e.currentTarget.value);
    };

    const gotoWatchpage = num => {
        const video_list_id = num;
        // console.log(first_video);

        watchPlaylist(video_list_id)
            .then(res => {
                console.log(res.data.data[0].video_id);
                history.push({
                    pathname: '/watch/' + res.data.data[0].video_id,
                    state: { playlistId: video_list_id },
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const renderPlaylists = Playlists.map((playlist, idx) => {
        console.log(playlist.id);
        var video_id = 0;
        fetchPlaylist(playlist.id).then(res => {
            if (res?.data?.data[0]?.video_id) {
                video_id = res.data.data[0].video_id;
            }
        });
        return (
            <div>
                <Col span={5}>
                    <Card style={{ width: '18rem' }} key={idx}>
                        <Card.Img variant="top" src={`${SERVER}/image/thumbnail/${video_id}`} />
                        <Card.Body>
                            <Card.Title>{playlist.title}</Card.Title>
                            <Card.Text>
                                <Button onClick={() => gotoWatchpage(playlist.id)}>
                                    Go to Watch
                                </Button>
                            </Card.Text>
                        </Card.Body>
                        <Card.Body>
                            {UpdateNum === playlist.id ? (
                                console.log('수정')
                            ) : (
                                <Button
                                    variant="outline-dark"
                                    onClick={() => onUpdateHander(playlist.id)}
                                >
                                    수정
                                </Button>
                            )}
                            <Button
                                variant="outline-dark"
                                onClick={() => onDeleteHander(playlist.id)}
                            >
                                삭제
                            </Button>
                            {UpdateNum === playlist.id ? (
                                <Form.Group>
                                    <Form.Control
                                        size="md"
                                        type="text"
                                        onChange={onPlaylistChangehandler}
                                        defaultValue={playlist.content}
                                    />
                                    <Button
                                        variant="outline-success"
                                        onClick={() => onUpdatePlaylistHander(playlist.id)}
                                    >
                                        수정하기
                                    </Button>
                                </Form.Group>
                            ) : (
                                <p>{playlist.content}</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        );
    });

    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <div className="mypage-card-title">
                <h1 style={{ fontWeight: 'bold' }}>마이 플레이리스트</h1>
            </div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="textarea"
                        placeholder="리스트 제목을 입력하세요."
                        onChange={playlistHandler}
                    />
                    <Button variant="outline-success" type="submit" onClick={createPlaylistHandler}>
                        +
                    </Button>
                </Form.Group>
            </Form>
            <Row>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderPlaylists}</div>
            </Row>
        </div>
    );
}

export default MyPlayList;
