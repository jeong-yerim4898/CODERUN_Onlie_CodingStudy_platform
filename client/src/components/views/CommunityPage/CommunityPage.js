import React from 'react';
import Footer from 'components/views/Footer/Footer';
import CommunityList from './CommunityList';

import './CommunityPage.css';

function CommunityPage() {
    return (
<<<<<<< HEAD
        <div className="community-board">
            <h1 style={{ fontSize: 80 }}> 코드런 지식인</h1>
            <CommunityList />
=======
        <div>
            <div className="community-board">
                <h1> 코드런 지식인</h1>
                <CommunityList />
                <Link to="community/upload/">
                    <Button variant="success">글쓰기</Button>
                </Link>
            </div>
            <Footer></Footer>
>>>>>>> 16552ba... feat: 🎸 css watch page video detail
        </div>
    );
}

export default CommunityPage;
