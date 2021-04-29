import React, { useEffect, useState } from 'react';
import { detailArticle, deleteArticle } from '_api/Board.js';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CommunityDetail() {
    const [Article, setArticle] = useState();

    useEffect(() => {
        detailArticle(10).then(res => {
            console.log(res.data.data);
            setArticle(res.data.data);
        });
    }, []);
    const deleteHandler = event => {
        event.preventDefault();
        const article_id = 10;
        console.log(1);

        deleteArticle(article_id).then(res => {
            console.log('delete success');
        });
    };
    return (
        <div>
            <p>{Article.title}</p>
            <p>{Article.content}</p>
            {/* <Link to="community/upload/">
                <Button variant="success">수정</Button>
            </Link> */}
            <Button variant="danger" onClick={deleteHandler}>
                삭제
            </Button>
        </div>
    );
}

export default CommunityDetail;
