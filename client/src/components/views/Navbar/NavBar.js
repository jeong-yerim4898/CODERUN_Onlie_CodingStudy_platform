import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function NavBar() {
    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Navbar.Brand href="/">CODE:RUN</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/class">클래스</Nav.Link>
                    <Nav.Link href="/community">커뮤니티</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </div>
    );
}

export default NavBar;
