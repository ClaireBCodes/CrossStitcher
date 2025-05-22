import "../styles/componentStyles.css";
import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <Nav className="nav-bar grad-pri-sec">
      <Nav.Item>
        <Nav.Link to="/editor" as={Link}>
          Create
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/freebies" as={Link}>
          Free Patterns
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to="/about" as={Link}>
          About
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
