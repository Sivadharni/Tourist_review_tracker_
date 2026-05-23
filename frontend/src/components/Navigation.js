import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className="navbar-custom"
      variant="light"
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🌍</span>
          TouristReview
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link className="nav-link-custom">Home</Nav.Link>
            </LinkContainer>
            
            {isAuthenticated ? (
              <>
                <NavDropdown 
                  title={
                    <span>
                      <span style={{ marginRight: '0.5rem' }}>👤</span>
                      {user?.username}
                    </span>
                  } 
                  id="user-dropdown" 
                  align="end"
                  className="nav-link-custom"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                  </LinkContainer>
                  {user?.username === 'admin' && (
                    <>
                      <NavDropdown.Divider />
                      <LinkContainer to="/admin">
                        <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <span style={{ marginRight: '0.5rem' }}>🚪</span>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link-custom">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="nav-link-custom">Register</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
