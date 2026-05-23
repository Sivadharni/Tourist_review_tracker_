import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    favoriteAttractions: []
  });

  // Mock user reviews data
  const mockUserReviews = [
    {
      id: 1,
      attraction: {
        id: 1,
        name: "Eiffel Tower",
        location: "Paris, France",
        imageUrl: "https://picsum.photos/seed/eiffel/100/100"
      },
      rating: 5,
      comment: "Absolutely breathtaking! The view from the top is incredible, especially during sunset. The light show at night is magical. A must-visit when in Paris!",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      attraction: {
        id: 2,
        name: "Statue of Liberty",
        location: "New York, USA",
        imageUrl: "https://picsum.photos/seed/liberty/100/100"
      },
      rating: 4,
      comment: "Great experience overall. The ferry ride offers amazing views of the Manhattan skyline. Very educational and inspiring.",
      createdAt: "2024-01-10T14:20:00Z"
    },
    {
      id: 3,
      attraction: {
        id: 3,
        name: "Great Wall of China",
        location: "Beijing, China",
        imageUrl: "https://picsum.photos/seed/greatwall/100/100"
      },
      rating: 5,
      comment: "Incredible piece of history! The climb is challenging but absolutely worth it for the views and the experience.",
      createdAt: "2023-12-20T09:15:00Z"
    }
  ];

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchUserData = async () => {
      try {
        // In production, replace with actual API calls
        // const reviewsResponse = await axios.get(`/api/users/${user.id}/reviews`);
        // const statsResponse = await axios.get(`/api/users/${user.id}/stats`);
        
        // Using mock data for now
        setTimeout(() => {
          setUserReviews(mockUserReviews);
          
          // Calculate stats from mock data
          const totalReviews = mockUserReviews.length;
          const averageRating = mockUserReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
          const favoriteAttractions = mockUserReviews
            .filter(review => review.rating >= 4)
            .map(review => review.attraction);
          
          setStats({
            totalReviews,
            averageRating: averageRating || 0,
            favoriteAttractions
          });
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        showError('Failed to load profile data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, showError]);

  const handleLogout = () => {
    logout();
    showSuccess('Logged out successfully');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="info">
          Please log in to view your profile
        </Alert>
        <Link to="/login">
          <Button variant="primary-custom">
            Go to Login
          </Button>
        </Link>
      </Container>
    );
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" className="spinner-border-custom" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-5">
      {/* Profile Header */}
      <Row className="mb-5">
        <Col lg={4}>
          <Card className="text-center border-0 shadow-sm">
            <Card.Body className="py-4">
              <div className="mb-3">
                <div 
                  className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    color: 'white',
                    fontSize: '3rem',
                    fontWeight: 'bold'
                  }}
                >
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </div>
              <h3 className="mb-1">{user.username}</h3>
              <p className="text-muted mb-3">{user.email}</p>
              <div className="d-flex justify-content-center gap-2 mb-3">
                <span className="badge bg-primary">Travel Enthusiast</span>
                <span className="badge bg-success">Active Reviewer</span>
              </div>
              <Button 
                variant="outline-danger" 
                onClick={handleLogout}
                className="rounded-pill"
              >
                <span style={{ marginRight: '0.5rem' }}>🚪</span>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {/* Stats Cards */}
          <Row className="g-3 mb-4">
            <Col md={4}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="display-6 fw-bold text-primary mb-2">
                    {stats.totalReviews}
                  </div>
                  <div className="text-muted">Reviews Written</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="display-6 fw-bold text-success mb-2">
                    {stats.averageRating.toFixed(1)}
                  </div>
                  <div className="text-muted">Average Rating</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <div className="display-6 fw-bold text-warning mb-2">
                    {stats.favoriteAttractions.length}
                  </div>
                  <div className="text-muted">Favorite Places</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-3">Quick Actions</h5>
              <div className="d-flex gap-2 flex-wrap">
                <Link to="/">
                  <Button variant="outline-custom" size="sm">
                    🏠 Browse Attractions
                  </Button>
                </Link>
                <Button variant="outline-custom" size="sm" disabled>
                  📊 View Analytics
                </Button>
                <Button variant="outline-custom" size="sm" disabled>
                  ⚙️ Account Settings
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* User Reviews Section */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">My Reviews ({userReviews.length})</h2>
        </div>

        {userReviews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">✍️</div>
            <h3 className="empty-state-title">No Reviews Yet</h3>
            <p className="empty-state-text">
              Start exploring and share your experiences with the community!
            </p>
            <Link to="/">
              <Button variant="primary-custom">
                Explore Attractions
              </Button>
            </Link>
          </div>
        ) : (
          <div className="reviews-list">
            {userReviews.map(review => (
              <Card key={review.id} className="review-card">
                <div className="review-header">
                  <div className="d-flex align-items-center">
                    <img 
                      src={review.attraction.imageUrl} 
                      alt={review.attraction.name}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="review-author">
                        <Link 
                          to={`/attraction/${review.attraction.id}`}
                          className="text-decoration-none"
                        >
                          {review.attraction.name}
                        </Link>
                      </div>
                      <div className="text-muted small">
                        📍 {review.attraction.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <StarRating rating={review.rating} size="1rem" />
                    <div className="text-muted small mt-1">
                      {formatDate(review.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="review-comment mt-3">
                  {review.comment}
                </div>
                <div className="mt-3">
                  <Link to={`/attraction/${review.attraction.id}`}>
                    <Button variant="outline-custom" size="sm">
                      View Attraction
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Favorite Attractions */}
      {stats.favoriteAttractions.length > 0 && (
        <section className="mt-5">
          <h2 className="mb-4">My Favorite Attractions</h2>
          <Row className="g-4">
            {stats.favoriteAttractions.map(attraction => (
              <Col key={attraction.id} md={6} lg={4}>
                <Card className="attraction-card">
                  <div style={{ overflow: 'hidden', height: '150px' }}>
                    <Card.Img 
                      variant="top" 
                      src={attraction.imageUrl} 
                      alt={attraction.name}
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="attraction-title">
                      {attraction.name}
                    </Card.Title>
                    <div className="attraction-location">
                      <span style={{ marginRight: '0.5rem' }}>📍</span>
                      {attraction.location}
                    </div>
                    <Link to={`/attraction/${attraction.id}`}>
                      <Button variant="primary-custom" className="w-100 mt-2">
                        View Details
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </Container>
  );
};

export default Profile;
