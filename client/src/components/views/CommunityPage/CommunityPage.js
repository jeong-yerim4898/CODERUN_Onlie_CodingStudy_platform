import React from 'react';
import CommunityList from './CommunityList';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CommunityPage.css';

function CommunityPage() {
    return (
        <div className="community-board">
            <h1> 코드런 지식인</h1>
            <CommunityList />
            <Link to="community/upload/">
                <Button variant="success">글쓰기</Button>
            </Link>
        </div>
    );
}

export default CommunityPage;
