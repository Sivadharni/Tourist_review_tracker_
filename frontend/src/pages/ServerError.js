import React from 'react';
import { Container, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaSync, FaExclamationTriangle } from 'react-icons/fa';

const ServerError = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <div className="error-page-content">
              {/* Error Number */}
              <div className="error-number mb-4">
                <h1 className="display-1 fw-bold text-danger">500</h1>
              </div>

              {/* Error Message */}
              <div className="error-message mb-4">
                <h2 className="h3 mb-3">Server Error</h2>
                <p className="text-muted fs-5 mb-4">
                  Something went wrong on our end! Our servers are experiencing some technical difficulties. 
                  We're working hard to fix this issue and get things back to normal.
                </p>
              </div>

              {/* Error Illustration */}
              <div className="error-illustration mb-5">
                <div style={{ fontSize: '8rem', opacity: '0.3' }}>
                  ⚙️
                </div>
              </div>

              {/* Alert */}
              <Alert variant="warning" className="mb-4">
                <FaExclamationTriangle className="me-2" />
                <strong>Temporary Issue:</strong> This is usually resolved within a few minutes. 
                Please try refreshing the page or come back later.
              </Alert>

              {/* Action Buttons */}
              <div className="error-actions d-flex justify-content-center gap-3 flex-wrap">
                <Button 
                  variant="primary-custom" 
                  size="lg" 
                  onClick={handleRefresh}
                  className="d-flex align-items-center"
                >
                  <FaSync className="me-2" />
                  Refresh Page
                </Button>
                
                <Link to="/">
                  <Button variant="outline-secondary" size="lg" className="d-flex align-items-center">
                    <FaHome className="me-2" />
                    Go Home
                  </Button>
                </Link>
              </div>

              {/* What You Can Do */}
              <div className="what-you-can-do mt-5">
                <h5 className="mb-3">What you can do:</h5>
                <ul className="text-start text-muted" style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <li>Try refreshing the page in a few minutes</li>
                  <li>Check your internet connection</li>
                  <li>Clear your browser cache and cookies</li>
                  <li>Contact our support team if the problem persists</li>
                </ul>
              </div>

              {/* Status Check */}
              <div className="status-check mt-4">
                <p className="text-muted small">
                  🔧 <strong>Status:</strong> Our team has been notified and is working on a fix.
                </p>
                <p className="text-muted small">
                  ⏰ <strong>Estimated Time:</strong> Usually resolved within 5-15 minutes.
                </p>
              </div>

              {/* Contact Support */}
              <div className="contact-support mt-4">
                <p className="text-muted">
                  Still having trouble? 
                  <a href="mailto:support@touristreview.com" className="text-primary text-decoration-none ms-1">
                    Contact Support
                  </a>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServerError;
