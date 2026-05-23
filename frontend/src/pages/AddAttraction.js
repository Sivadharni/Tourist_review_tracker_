import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AddAttraction = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    category: 'Historical',
    priceRange: 'medium',
    website: '',
    phone: '',
    email: '',
    openingHours: '',
    bestTimeToVisit: '',
    tags: ''
  });
  
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    'Historical', 'Natural', 'Cultural', 'Adventure',
    'Religious', 'Modern', 'Entertainment', 'Educational'
  ];

  const priceRanges = [
    { value: 'free', label: 'Free' },
    { value: 'low', label: '$ (Low)' },
    { value: 'medium', label: '$$ (Medium)' },
    { value: 'high', label: '$$$ (High)' },
    { value: 'luxury', label: '$$$$ (Luxury)' }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      showError('Please log in to add an attraction');
      navigate('/login');
      return;
    }
  }, [isAuthenticated, navigate, showError]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Attraction name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = 'Description must be less than 2000 characters';
    }
    
    if (uploadedImages.length === 0) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleImageUpload = (imageData) => {
    setUploadedImages(prev => [...prev, imageData]);
    
    // Clear image error if any
    if (errors.images) {
      setErrors({
        ...errors,
        images: ''
      });
    }
  };

  const handleImageRemove = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare data for submission
      const attractionData = {
        ...formData,
        images: uploadedImages,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      // In production, replace with actual API call
      // const response = await axios.post('/api/attractions', attractionData);
      
      // Mock API call
      setTimeout(() => {
        showSuccess('Attraction added successfully! It will be reviewed by our team.');
        navigate('/');
      }, 2000);
      
    } catch (error) {
      showError('Failed to add attraction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h2 className="text-center mb-4">Add New Attraction</h2>
              <p className="text-center text-muted mb-4">
                Share an amazing place with the community
              </p>

              {errors.general && (
                <Alert variant="danger">
                  {errors.general}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Attraction Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="e.g., Eiffel Tower"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Location *</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        placeholder="e.g., Paris, France"
                        value={formData.location}
                        onChange={handleChange}
                        isInvalid={!!errors.location}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.location}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price Range</Form.Label>
                      <Form.Select
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        {priceRanges.map(range => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="description"
                    placeholder="Describe the attraction, its history, what visitors can expect, and why it's worth visiting..."
                    value={formData.description}
                    onChange={handleChange}
                    isInvalid={!!errors.description}
                    disabled={loading}
                    maxLength={2000}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                  <div className="text-muted small mt-1">
                    {formData.description.length}/2000 characters
                  </div>
                </Form.Group>

                {/* Image Upload */}
                <Form.Group className="mb-4">
                  <Form.Label>Images *</Form.Label>
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    onImageRemove={handleImageRemove}
                    currentImages={uploadedImages}
                    maxImages={5}
                    maxSize={5 * 1024 * 1024}
                  />
                  {errors.images && (
                    <div className="text-danger small mt-1">
                      {errors.images}
                    </div>
                  )}
                </Form.Group>

                {/* Additional Information */}
                <h5 className="mb-3">Additional Information</h5>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        type="url"
                        name="website"
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="info@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Opening Hours</Form.Label>
                      <Form.Control
                        type="text"
                        name="openingHours"
                        placeholder="e.g., 9:00 AM - 6:00 PM"
                        value={formData.openingHours}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Best Time to Visit</Form.Label>
                      <Form.Control
                        type="text"
                        name="bestTimeToVisit"
                        placeholder="e.g., Spring, Morning hours"
                        value={formData.bestTimeToVisit}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tags</Form.Label>
                      <Form.Control
                        type="text"
                        name="tags"
                        placeholder="e.g., family-friendly, photography, historic"
                        value={formData.tags}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <Form.Text className="text-muted">
                        Separate tags with commas
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Submission Guidelines */}
                <Alert variant="info">
                  <h6 className="alert-heading">
                    <span style={{ marginRight: '0.5rem' }}>📝</span>
                    Submission Guidelines
                  </h6>
                  <ul className="mb-0 small">
                    <li>Ensure all information is accurate and up-to-date</li>
                    <li>Use high-quality, original images</li>
                    <li>Provide detailed descriptions to help visitors</li>
                    <li>Include contact information when possible</li>
                    <li>Submissions will be reviewed before being published</li>
                  </ul>
                </Alert>

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
                        Submitting...
                      </>
                    ) : (
                      'Submit Attraction'
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
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default AddAttraction;
