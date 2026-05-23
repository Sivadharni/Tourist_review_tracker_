import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [attraction, setAttraction] = useState(null);
  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [attractionLoading, setAttractionLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Mock attraction data
  const mockAttraction = {
    id: parseInt(id),
    name: "Eiffel Tower",
    location: "Paris, France",
    imageUrl: "https://picsum.photos/seed/eiffel/400/300"
  };

  useEffect(() => {
    if (!isAuthenticated) {
      showError('Please log in to write a review');
      navigate('/login');
      return;
    }

    const fetchAttraction = async () => {
      try {
        // In production, replace with actual API call
        // const response = await axios.get(`/api/attractions/${id}`);
        // setAttraction(response.data);
        
        // Using mock data for now
        setTimeout(() => {
          setAttraction(mockAttraction);
          setAttractionLoading(false);
        }, 500);
      } catch (error) {
        showError('Failed to load attraction details');
        setAttractionLoading(false);
      }
    };

    fetchAttraction();
  }, [id, isAuthenticated, navigate, showError]);

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!formData.comment.trim()) {
      newErrors.comment = 'Please write a review comment';
    } else if (formData.comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters long';
    } else if (formData.comment.trim().length > 1000) {
      newErrors.comment = 'Review must be less than 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
    
    if (errors.rating) {
      setErrors({
        ...errors,
        rating: ''
      });
    }
  };

  const handleCommentChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      comment: value
    });
    
    if (errors.comment) {
      setErrors({
        ...errors,
        comment: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // In production, replace with actual API call
      // await axios.post(`/api/attractions/${id}/reviews`, {
      //   rating: formData.rating,
      //   comment: formData.comment.trim()
      // });
      
      // Mock API call
      setTimeout(() => {
        showSuccess('Review added successfully!');
        navigate(`/attraction/${id}`);
      }, 1000);
      
    } catch (error) {
      showError('Failed to add review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/attraction/${id}`);
  };

  if (attractionLoading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" className="spinner-border-custom" variant="primary" />
      </div>
    );
  }

  if (!attraction) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Attraction not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Attraction Info Card */}
          <Card className="mb-4 border-0 shadow-sm">
            <div className="row g-0">
              <div className="col-md-4">
                <img 
                  src={attraction.imageUrl} 
                  alt={attraction.name}
                  className="img-fluid rounded-start h-100"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h3 className="card-title">{attraction.name}</h3>
                  <p className="text-muted mb-3">
                    <span style={{ marginRight: '0.5rem' }}>📍</span>
                    {attraction.location}
                  </p>
                  <p className="mb-0">
                    Share your experience and help other travelers make informed decisions.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Review Form Card */}
          <Card className="auth-card">
            <h2 className="auth-title">Write Your Review</h2>
            <p className="text-center text-muted mb-4">
              Tell us about your experience at {attraction.name}
            </p>

            <Form onSubmit={handleSubmit}>
              {/* Rating Selection */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  Your Rating <span className="text-danger">*</span>
                </Form.Label>
                <div className="text-center my-3">
                  <StarRating 
                    rating={formData.rating} 
                    interactive={true}
                    onRatingChange={handleRatingChange}
                    size="2rem"
                  />
                </div>
                {errors.rating && (
                  <div className="text-danger small mt-2">
                    {errors.rating}
                  </div>
                )}
                <div className="text-muted text-center">
                  Click on the stars to rate
                </div>
              </Form.Group>

              {/* Comment */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">
                  Your Review <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Share your experience with this attraction. What did you like? What could be improved?"
                  value={formData.comment}
                  onChange={handleCommentChange}
                  isInvalid={!!errors.comment}
                  disabled={loading}
                  maxLength={1000}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.comment}
                </Form.Control.Feedback>
                <div className="text-muted small mt-1">
                  {formData.comment.length}/1000 characters
                </div>
              </Form.Group>

              {/* Review Guidelines */}
              <div className="alert alert-info mb-4">
                <h6 className="alert-heading">
                  <span style={{ marginRight: '0.5rem' }}>💡</span>
                  Review Guidelines
                </h6>
                <ul className="mb-0 small">
                  <li>Be specific and detailed in your review</li>
                  <li>Share both positive and negative experiences</li>
                  <li>Keep your review respectful and constructive</li>
                  <li>Focus on your personal experience</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3">
                <Button
                  type="submit"
                  className="btn-primary-custom flex-fill"
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
                      Submitting Review...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
                
                <Button
                  variant="outline-secondary"
                  onClick={handleCancel}
                  disabled={loading}
                  style={{ borderRadius: '25px', padding: '12px 30px' }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AddReview;
