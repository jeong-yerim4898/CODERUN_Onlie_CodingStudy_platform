import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import NavBarSearch from './NavBarSearch.js';

function NavBar() {
    return (
        <div className="Nav">
            <Navbar
                fixed="top"
                collapseOnSelect
                expand="lg"
                variant="dark"
                className="NavContainer"
            >
                {/* 로고 */}
                <Navbar.Brand href="/" className="NavLogo">
                    코드런
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="sidebar">
                    <Nav className="NavMenu">
                        {/* 탭 */}
                        <Nav.Item className="NavItem">
                            <Nav.Link href="/class" className="NavLink">
                                클래스
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="NavItem">
                            <Nav.Link href="/community" className="NavLink">
                                커뮤니티
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="NavMenu">
                        {/* 검색창 */}
                        <Nav.Item className="NavItem">
                            <NavBarSearch />
                        </Nav.Item>
                        {/* 동영상업로드 버튼 */}
                        <Nav.Item className="NavItem">
                            <Button variant="outline-info">
                                <FontAwesomeIcon icon={faPlus} className="NavVideoBtn" />
                            </Button>
                        </Nav.Item>
                        {/* 로그인/회원가입 버튼 */}
                        <Nav.Item className="NavItem">
                            <a href="/account">
                                <button className="Nav-AccountBtn">LogIn</button>
                            </a>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;
