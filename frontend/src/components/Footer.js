import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="text-center">
          <Col md={4}>
            <h5 className="mb-3">TouristReview</h5>
            <p className="small text-muted">
              Discover and review amazing places around the world
            </p>
          </Col>
          <Col md={4}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li><a href="/" className="text-white-50 text-decoration-none">Home</a></li>
              <li><a href="/login" className="text-white-50 text-decoration-none">Login</a></li>
              <li><a href="/register" className="text-white-50 text-decoration-none">Register</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="mb-3">Tech Stack</h5>
            <p className="small text-muted">
              React.js • Spring Boot • MySQL • JWT
            </p>
          </Col>
        </Row>
        <hr className="my-3 bg-secondary" />
        <Row>
          <Col className="text-center">
            <p className="small text-muted mb-0">
              © 2024 TouristReview. Built with ❤️ for travelers.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
