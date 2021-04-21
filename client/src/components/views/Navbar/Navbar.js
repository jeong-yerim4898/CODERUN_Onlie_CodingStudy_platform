import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

function NavBar() {
    return (
        <div>
            <Navbar fixed="top" bg="dark" variant="dark">
                <Navbar.Brand href="#home">CODE:RUN</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
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
