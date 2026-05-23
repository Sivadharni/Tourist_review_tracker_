import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        showSuccess('Login successful! Welcome back!');
        navigate('/');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      showError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="text-center text-muted mb-4">
          Sign in to your account to continue exploring
        </p>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Floating>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <label htmlFor="username">Username</label>
            </Form.Floating>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Floating>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <label htmlFor="password">Password</label>
            </Form.Floating>
          </Form.Group>

          <Button
            type="submit"
            className="btn-primary-custom w-100 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </Form>

        <div className="text-center">
          <p className="text-muted mb-0">
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;
