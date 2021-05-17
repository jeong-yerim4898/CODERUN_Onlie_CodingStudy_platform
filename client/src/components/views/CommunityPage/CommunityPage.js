import React from 'react';
import CommunityList from './CommunityList';
import { Button } from 'react-bootstrap';

import './CommunityPage.css';

function CommunityPage() {
    return (
        <div className="community-board">
            <h1> 코드런 지식인</h1>
            <CommunityList />
        </div>
    );
}

export default CommunityPage;
