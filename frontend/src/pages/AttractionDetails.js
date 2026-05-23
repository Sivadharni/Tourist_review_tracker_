import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Dropdown } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import SocialShare from '../components/SocialShare';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AttractionDetails = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('latest');
  const { isAuthenticated } = useAuth();
  const { showError } = useToast();

  // Mock attraction data
  const mockAttraction = {
    id: parseInt(id),
    name: "Eiffel Tower",
    location: "Paris, France",
    description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Constructed from 1887 to 1889 as the entrance to the 1889 World's Fair, it was initially criticized by some of France's leading artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most recognizable structures in the world. The tower is 330 metres (1,083 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930.",
    imageUrl: "https://picsum.photos/seed/eiffel/1200/400",
    averageRating: 4.5,
    reviewCount: 2341
  };

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      user: {
        username: "traveler123",
        id: 1
      },
      rating: 5,
      comment: "Absolutely breathtaking! The view from the top is incredible, especially during sunset. The light show at night is magical. A must-visit when in Paris!",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      user: {
        username: "wanderlust22",
        id: 2
      },
      rating: 4,
      comment: "Great experience overall. The elevator ride is smooth and the views are spectacular. Can get quite crowded during peak hours, so I recommend going early morning or late evening.",
      createdAt: "2024-01-10T14:20:00Z"
    },
    {
      id: 3,
      user: {
        username: "parislover",
        id: 3
      },
      rating: 5,
      comment: "Iconic landmark that lives up to the hype! The architecture is stunning and the surrounding area is beautiful. Don't forget to visit the local cafes nearby.",
      createdAt: "2024-01-05T09:15:00Z"
    },
    {
      id: 4,
      user: {
        username: "backpacker99",
        id: 4
      },
      rating: 3,
      comment: "It's impressive but extremely touristy. Long queues and expensive tickets. The view is nice but I think there are better ways to see Paris from above.",
      createdAt: "2023-12-28T16:45:00Z"
    },
    {
      id: 5,
      user: {
        username: "photographer_pro",
        id: 5
      },
      rating: 5,
      comment: "Perfect for photography! Every angle offers a unique perspective. The golden hour lighting is absolutely stunning. Bring your camera!",
      createdAt: "2023-12-20T11:30:00Z"
    }
  ];

  useEffect(() => {
    const fetchAttractionDetails = async () => {
      try {
        // In production, replace with actual API call
        // const response = await axios.get(`/api/attractions/${id}`);
        // setAttraction(response.data);
        
        // Using mock data for now
        setTimeout(() => {
          setAttraction(mockAttraction);
          setLoading(false);
        }, 1000);
      } catch (error) {
        showError('Failed to load attraction details');
        setLoading(false);
      }
    };

    fetchAttractionDetails();
  }, [id, showError]);

  useEffect(() => {
    if (attraction) {
      fetchReviews();
    }
  }, [attraction, sortBy]);

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      // In production, replace with actual API call
      // const response = await axios.get(`/api/attractions/${id}/reviews?sort=${sortBy}`);
      // setReviews(response.data);
      
      // Using mock data for now
      setTimeout(() => {
        let sortedReviews = [...mockReviews];
        
        if (sortBy === 'highest') {
          sortedReviews.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'lowest') {
          sortedReviews.sort((a, b) => a.rating - b.rating);
        } else if (sortBy === 'latest') {
          sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        setReviews(sortedReviews);
        setReviewsLoading(false);
      }, 500);
    } catch (error) {
      showError('Failed to load reviews');
      setReviewsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
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
    <>
      {/* Hero Banner */}
      <div className="position-relative">
        <img 
          src={attraction.imageUrl} 
          alt={attraction.name}
          className="w-100"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="text-center text-white">
            <h1 className="display-4 fw-bold mb-3">{attraction.name}</h1>
            <p className="fs-4 mb-0">
              <span style={{ marginRight: '0.5rem' }}>📍</span>
              {attraction.location}
            </p>
          </div>
        </div>
      </div>

      <Container className="py-5">
        <Row>
          <Col lg={8}>
            {/* Description Section */}
            <section className="mb-5">
              <h2 className="mb-3">About This Place</h2>
              <p className="lead">{attraction.description}</p>
            </section>

            {/* Reviews Section */}
            <section>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Reviews ({reviews.length})</h2>
                <div className="d-flex gap-2 align-items-center">
                  <span className="text-muted me-2">Sort by:</span>
                  <Dropdown onSelect={(value) => setSortBy(value)}>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                      {sortBy === 'latest' && 'Latest'}
                      {sortBy === 'highest' && 'Highest Rated'}
                      {sortBy === 'lowest' && 'Lowest Rated'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="latest">Latest</Dropdown.Item>
                      <Dropdown.Item eventKey="highest">Highest Rated</Dropdown.Item>
                      <Dropdown.Item eventKey="lowest">Lowest Rated</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              {reviewsLoading ? (
                <div className="loading-spinner">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">💬</div>
                  <h3 className="empty-state-title">No Reviews Yet</h3>
                  <p className="empty-state-text">
                    Be the first to share your experience about this attraction!
                  </p>
                  {isAuthenticated && (
                    <Link to={`/add-review/${attraction.id}`}>
                      <Button variant="primary-custom">
                        Write First Review
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="reviews-list">
                  {reviews.map(review => (
                    <Card key={review.id} className="review-card">
                      <div className="review-header">
                        <div>
                          <div className="review-author">
                            <span style={{ marginRight: '0.5rem' }}>👤</span>
                            {review.user.username}
                          </div>
                          <div className="review-date">
                            {formatDate(review.createdAt)}
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="1rem" />
                      </div>
                      <div className="review-comment">
                        {review.comment}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </Col>

          <Col lg={4}>
            {/* Sidebar */}
            <div className="sticky-top" style={{ top: '100px' }}>
              {/* Rating Summary */}
              <Card className="mb-4">
                <Card.Body>
                  <h4 className="text-center mb-3">Rating Summary</h4>
                  <div className="text-center mb-3">
                    <div className="display-4 fw-bold text-primary mb-2">
                      {attraction.averageRating.toFixed(1)}
                    </div>
                    <StarRating rating={attraction.averageRating} size="1.5rem" />
                    <div className="text-muted mt-2">
                      {attraction.reviewCount} reviews
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Action Buttons */}
              {isAuthenticated ? (
                <Link to={`/add-review/${attraction.id}`}>
                  <Button variant="primary-custom" className="w-100 mb-3">
                    ✍️ Write a Review
                  </Button>
                </Link>
              ) : (
                <div className="text-center mb-3">
                  <p className="text-muted mb-3">
                    Sign in to write a review
                  </p>
                  <Link to="/login">
                    <Button variant="outline-custom" className="w-100">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}

              {/* Social Share */}
              <div className="mb-3">
                <SocialShare
                  url={window.location.href}
                  title={attraction.name}
                  description={attraction.description}
                  image={attraction.imageUrl}
                  className="w-100"
                />
              </div>

              {/* Quick Info */}
              <Card>
                <Card.Body>
                  <h5 className="mb-3">Quick Info</h5>
                  <div className="mb-2">
                    <strong>Location:</strong> {attraction.location}
                  </div>
                  <div className="mb-2">
                    <strong>Total Reviews:</strong> {attraction.reviewCount}
                  </div>
                  <div>
                    <strong>Average Rating:</strong> {attraction.averageRating.toFixed(1)}/5.0
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AttractionDetails;
