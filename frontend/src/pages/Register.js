import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  
  const { register } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
    
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await register(formData.username, formData.email, formData.password);
      
      if (result.success) {
        showSuccess('Registration successful! Please log in to continue.');
        navigate('/login');
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      showError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Join our community and start exploring amazing places
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
                isInvalid={!!validationErrors.username}
                disabled={loading}
                required
              />
              <label htmlFor="username">Username</label>
              <Form.Control.Feedback type="invalid">
                {validationErrors.username}
              </Form.Control.Feedback>
            </Form.Floating>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Floating>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!validationErrors.email}
                disabled={loading}
                required
              />
              <label htmlFor="email">Email</label>
              <Form.Control.Feedback type="invalid">
                {validationErrors.email}
              </Form.Control.Feedback>
            </Form.Floating>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Floating>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!validationErrors.password}
                disabled={loading}
                required
              />
              <label htmlFor="password">Password</label>
              <Form.Control.Feedback type="invalid">
                {validationErrors.password}
              </Form.Control.Feedback>
            </Form.Floating>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Floating>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!validationErrors.confirmPassword}
                disabled={loading}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Form.Control.Feedback type="invalid">
                {validationErrors.confirmPassword}
              </Form.Control.Feedback>
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </Form>

        <div className="text-center">
          <p className="text-muted mb-0">
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Register;
