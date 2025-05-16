import '../styles/componentStyles.css';
import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <Nav className="nav-bar grad-pri-sec">
      <Nav.Item>
        <Nav.Link to="/home" as={Link}>
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/editor" as={Link}>
          Editor
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/gallery" as={Link}>
          My Gallery
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/freebies" as={Link}>
          Free Patterns
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}