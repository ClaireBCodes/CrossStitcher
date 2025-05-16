import "../styles/componentStyles.css";
import React from "react";
import Nav from "react-bootstrap/Nav";

export function FooterBar() {
  return (
    <>
      <Nav className="justify-content-center py-3 footer-bar grad-pri-sec">
        <Nav.Item>
          <Nav.Link> © Claire Barrell 2025 </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>Powered by caffine and optimism</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>(c) Opensource</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>etc</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}
