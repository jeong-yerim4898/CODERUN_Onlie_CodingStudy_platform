import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    detailArticle,
    listComment,
    selectComment,
    deleteComment,
    createComment,
    updatingComment,
} from '_api/Board.js';
import { ListGroup, Button, Badge, Form } from 'react-bootstrap';

function CommentList(props) {
    let user = useSelector(state => state.user);

    const ArticleId = props.ArticleId;
    const [Article, setArticle] = useState({});
    const [Comments, setComments] = useState([]);
    const [Comment, setComment] = useState([]);
    const [updateComment, setupdateComment] = useState('');
    const [UpdateNum, setUpdateNum] = useState(null);
    useEffect(() => {
        detailArticle(ArticleId).then(res => {
            setArticle(res.data.data);
        });
        listComment(ArticleId).then(res => {
            setComments(res.data.data);
        });
    }, []);

    const commentHandler = event => {
        setComment(event.currentTarget.value);
    };
    const createCommentHandler = event => {
        event.preventDefault();
        const article_id = ArticleId;

        const body = {
            board_id: article_id,
            content: Comment,
        };

        createComment(body).then(res => {
            // console.log(res.data.data);
            listComment(ArticleId).then(res => {
                setComments(res.data.data);
            });
        });
    };
    const onselectHander = idx => {
        const body = {
            board_comment_id: idx,
        };
        selectComment(body).then(res => {
            listComment(ArticleId).then(res => {
                setComments(res.data.data);
            });
        });
    };
    const onDeleteHander = idx => {
        deleteComment(idx).then(res => {
            listComment(ArticleId).then(res => {
                setComments(res.data.data);
            });
        });
    };
    const onUpdateHander = idx => {
        setUpdateNum(idx);
    };
    const onUpdateCommentHander = event => {
        const board_comment_id = UpdateNum;

        const body = {
            board_comment_id: board_comment_id,
            content: updateComment,
        };

        updatingComment(body).then(res => {
            listComment(ArticleId).then(res => {
                setComments(res.data.data);
                setUpdateNum(null);
            });
        });
    };
    const onCommentChangehandler = event => {
        setupdateComment(event.currentTarget.value);
    };
    const renderComments = Comments.map((comment, index) => {
        return (
            <ListGroup.Item key={index}>
                {comment.user_id}
                {comment.select ? <Badge variant="warning">채택</Badge> : console.log()}
                {!Article.select && Article.user_id === user?.login?.user?.id ? (
                    <Button onClick={() => onselectHander(comment.id)}>채택하기</Button>
                ) : (
                    console.log()
                )}
                {Article.user_id === user?.login?.user?.id ||
                comment.user_id === user?.login?.user?.id ? (
                    <Button variant="danger" onClick={() => onDeleteHander(comment.id)}>
                        삭제
                    </Button>
                ) : (
                    console.log()
                )}

                {UpdateNum !== comment.id && comment.user_id === user?.login?.user?.id ? (
                    <Button variant="success" onClick={() => onUpdateHander(comment.id)}>
                        수정
                    </Button>
                ) : (
                    console.log()
                )}

                <br />
                <br />
                {UpdateNum === comment.id ? (
                    <Form.Group>
                        <Form.Control
                            size="md"
                            type="text"
                            onChange={onCommentChangehandler}
                            defaultValue={comment.content}
                        />
                        <Button variant="success" onClick={() => onUpdateCommentHander(comment.id)}>
                            수정하기
                        </Button>
                    </Form.Group>
                ) : (
                    <p>{comment.content}</p>
                )}
            </ListGroup.Item>
        );
    });
    return (
        <div>
            <h4>댓글</h4>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="textarea"
                        placeholder="댓글을 작성하세요"
                        onChange={commentHandler}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={createCommentHandler}>
                    댓글작성
                </Button>
            </Form>
            <ListGroup>{renderComments}</ListGroup>
        </div>
    );
}

export default CommentList;
