import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <div className="error-page-content">
              {/* Error Number */}
              <div className="error-number mb-4">
                <h1 className="display-1 fw-bold text-primary">404</h1>
              </div>

              {/* Error Message */}
              <div className="error-message mb-4">
                <h2 className="h3 mb-3">Page Not Found</h2>
                <p className="text-muted fs-5 mb-4">
                  Oops! The page you're looking for seems to have vanished into thin air. 
                  Don't worry, even the best travelers get lost sometimes!
                </p>
              </div>

              {/* Error Illustration */}
              <div className="error-illustration mb-5">
                <div style={{ fontSize: '8rem', opacity: '0.3' }}>
                  🗺️
                </div>
              </div>

              {/* Action Buttons */}
              <div className="error-actions d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/">
                  <Button variant="primary-custom" size="lg" className="d-flex align-items-center">
                    <FaHome className="me-2" />
                    Go Home
                  </Button>
                </Link>
                
                <Button 
                  variant="outline-secondary" 
                  size="lg" 
                  onClick={() => window.history.back()}
                  className="d-flex align-items-center"
                >
                  <FaArrowLeft className="me-2" />
                  Go Back
                </Button>
              </div>

              {/* Helpful Links */}
              <div className="helpful-links mt-5">
                <h5 className="mb-3">Looking for something specific?</h5>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link to="/" className="text-decoration-none">
                    <Button variant="outline-primary" size="sm" className="d-flex align-items-center">
                      <FaSearch className="me-2" />
                      Browse Attractions
                    </Button>
                  </Link>
                  <Link to="/login" className="text-decoration-none">
                    <Button variant="outline-primary" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" className="text-decoration-none">
                    <Button variant="outline-primary" size="sm">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Search Suggestion */}
              <div className="search-suggestion mt-4">
                <p className="text-muted small">
                  💡 <strong>Tip:</strong> Try using our search feature to find what you're looking for, 
                  or check out our popular destinations.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
