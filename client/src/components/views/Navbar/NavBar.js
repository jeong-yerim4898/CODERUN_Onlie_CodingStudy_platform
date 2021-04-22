import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark">
                {/* 로고 */}
                <Navbar.Brand href="/">CODE:RUN</Navbar.Brand>
                {/* 탭 */}
                <Nav className="mr-auto">
                    <Nav.Link href="/class">클래스</Nav.Link>
                    <Nav.Link href="/community">커뮤니티</Nav.Link>
                </Nav>
                {/* 검색창 */}
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">
                        <FontAwesomeIcon icon={faSearch} className="search" />
                    </Button>
                </Form>
                {/* 동영상업로드 버튼 */}
                <Button variant="outline-info">
                    <FontAwesomeIcon icon={faPlus} className="uploadvideo" />
                </Button>
                {/* 로그인/회원가입 버튼 */}
                <Button href="/account" variant="info">
                    LogIn
                </Button>
            </Navbar>
        </div>
    );
}

export default NavBar;
