import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <div>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Notes Keeper</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  aria-label="Search"
                />
              </Form>
            </Nav>
            <Nav>
              <Nav.Link href="/mynotes">My Notes</Nav.Link>

              <NavDropdown title="Sunny jain" id="basic-navbar-dropdown">
                <NavDropdown.Item href="#action3">
                  <i className="fa fa-user"></i> My Profile
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    history.push("/");
                  }}
                >
                  <i className="fa fa-sign-out"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
