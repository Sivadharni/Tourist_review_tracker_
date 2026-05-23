import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Table, 
  Badge,
  Form,
  Modal,
  Alert,
  Spinner
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaMapMarkedAlt, 
  FaStar, 
  FaChartBar,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAttractions: 0,
    totalReviews: 0,
    averageRating: 0
  });
  
  const [attractions, setAttractions] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleteType, setDeleteType] = useState('');

  // Mock data for demonstration
  const mockStats = {
    totalUsers: 1234,
    totalAttractions: 56,
    totalReviews: 8901,
    averageRating: 4.2
  };

  const mockAttractions = [
    {
      id: 1,
      name: "Eiffel Tower",
      location: "Paris, France",
      averageRating: 4.5,
      reviewCount: 2341,
      status: "active",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      name: "Statue of Liberty",
      location: "New York, USA",
      averageRating: 4.3,
      reviewCount: 1876,
      status: "active",
      createdAt: "2024-01-10"
    },
    {
      id: 3,
      name: "Great Wall of China",
      location: "Beijing, China",
      averageRating: 4.7,
      reviewCount: 3124,
      status: "active",
      createdAt: "2024-01-05"
    },
    {
      id: 4,
      name: "Colosseum",
      location: "Rome, Italy",
      averageRating: 4.6,
      reviewCount: 2890,
      status: "pending",
      createdAt: "2024-01-01"
    }
  ];

  const mockUsers = [
    {
      id: 1,
      username: "traveler123",
      email: "traveler@example.com",
      reviewCount: 15,
      status: "active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      username: "wanderlust22",
      email: "wanderlust@example.com",
      reviewCount: 8,
      status: "active",
      joinDate: "2024-01-10"
    },
    {
      id: 3,
      username: "explorer99",
      email: "explorer@example.com",
      reviewCount: 23,
      status: "suspended",
      joinDate: "2023-12-20"
    }
  ];

  const mockReviews = [
    {
      id: 1,
      attraction: "Eiffel Tower",
      user: "traveler123",
      rating: 5,
      comment: "Amazing experience!",
      status: "approved",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      attraction: "Statue of Liberty",
      user: "wanderlust22",
      rating: 4,
      comment: "Great views!",
      status: "pending",
      createdAt: "2024-01-14"
    },
    {
      id: 3,
      attraction: "Great Wall of China",
      user: "explorer99",
      rating: 3,
      comment: "Too crowded",
      status: "flagged",
      createdAt: "2024-01-13"
    }
  ];

  useEffect(() => {
    // Check if user is admin (in production, this would be a proper role check)
    if (user?.username !== 'admin') {
      showError('Access denied. Admin privileges required.');
      return;
    }

    const fetchData = async () => {
      try {
        // In production, replace with actual API calls
        // const [statsRes, attractionsRes, usersRes, reviewsRes] = await Promise.all([
        //   axios.get('/api/admin/stats'),
        //   axios.get('/api/admin/attractions'),
        //   axios.get('/api/admin/users'),
        //   axios.get('/api/admin/reviews')
        // ]);
        
        // Using mock data for now
        setTimeout(() => {
          setStats(mockStats);
          setAttractions(mockAttractions);
          setUsers(mockUsers);
          setReviews(mockReviews);
          setLoading(false);
        }, 1000);
      } catch (error) {
        showError('Failed to load admin data');
        setLoading(false);
      }
    };

    fetchData();
  }, [user, showError]);

  const handleDelete = (type, item) => {
    setDeleteType(type);
    setDeleteItem(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // In production, make actual API call
      // await axios.delete(`/api/admin/${deleteType}/${deleteItem.id}`);
      
      // Mock deletion
      if (deleteType === 'attraction') {
        setAttractions(prev => prev.filter(a => a.id !== deleteItem.id));
      } else if (deleteType === 'user') {
        setUsers(prev => prev.filter(u => u.id !== deleteItem.id));
      } else if (deleteType === 'review') {
        setReviews(prev => prev.filter(r => r.id !== deleteItem.id));
      }
      
      showSuccess(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} deleted successfully`);
      setShowDeleteModal(false);
      setDeleteItem(null);
      setDeleteType('');
    } catch (error) {
      showError('Failed to delete item');
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: 'success',
      pending: 'warning',
      suspended: 'danger',
      flagged: 'danger',
      approved: 'success'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" className="spinner-border-custom" variant="primary" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Admin Dashboard</h1>
          <div>
            <span className="text-muted me-3">Welcome, {user?.username}</span>
            <Button variant="outline-danger" size="sm">
              Logout
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-4">
          <Button
            variant={activeTab === 'dashboard' ? 'primary' : 'outline-secondary'}
            className="me-2"
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartBar className="me-2" />
            Dashboard
          </Button>
          <Button
            variant={activeTab === 'attractions' ? 'primary' : 'outline-secondary'}
            className="me-2"
            onClick={() => setActiveTab('attractions')}
          >
            <FaMapMarkedAlt className="me-2" />
            Attractions
          </Button>
          <Button
            variant={activeTab === 'users' ? 'primary' : 'outline-secondary'}
            className="me-2"
            onClick={() => setActiveTab('users')}
          >
            <FaUsers className="me-2" />
            Users
          </Button>
          <Button
            variant={activeTab === 'reviews' ? 'primary' : 'outline-secondary'}
            onClick={() => setActiveTab('reviews')}
          >
            <FaStar className="me-2" />
            Reviews
          </Button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <Row>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <FaUsers className="text-primary mb-3" style={{ fontSize: '2rem' }} />
                  <h3>{stats.totalUsers.toLocaleString()}</h3>
                  <p className="text-muted">Total Users</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <FaMapMarkedAlt className="text-success mb-3" style={{ fontSize: '2rem' }} />
                  <h3>{stats.totalAttractions}</h3>
                  <p className="text-muted">Attractions</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <FaStar className="text-warning mb-3" style={{ fontSize: '2rem' }} />
                  <h3>{stats.totalReviews.toLocaleString()}</h3>
                  <p className="text-muted">Total Reviews</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center border-0 shadow-sm">
                <Card.Body>
                  <FaChartBar className="text-info mb-3" style={{ fontSize: '2rem' }} />
                  <h3>{stats.averageRating}</h3>
                  <p className="text-muted">Avg Rating</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Attractions Tab */}
        {activeTab === 'attractions' && (
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Attractions Management</h5>
              <Button variant="primary-custom" size="sm">
                <FaPlus className="me-2" />
                Add Attraction
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attractions.map(attraction => (
                    <tr key={attraction.id}>
                      <td>
                        <Link to={`/attraction/${attraction.id}`}>
                          {attraction.name}
                        </Link>
                      </td>
                      <td>{attraction.location}</td>
                      <td>⭐ {attraction.averageRating}</td>
                      <td>{attraction.reviewCount}</td>
                      <td>{getStatusBadge(attraction.status)}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" className="me-2">
                          <FaEye />
                        </Button>
                        <Button variant="outline-secondary" size="sm" className="me-2">
                          <FaEdit />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete('attraction', attraction)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <Card.Header>
              <h5 className="mb-0">Users Management</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Reviews</th>
                    <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.reviewCount}</td>
                      <td>{getStatusBadge(user.status)}</td>
                      <td>{user.joinDate}</td>
                      <td>
                        <Button variant="outline-secondary" size="sm" className="me-2">
                          <FaEye />
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete('user', user)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <Card>
            <Card.Header>
              <h5 className="mb-0">Reviews Management</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Attraction</th>
                    <th>User</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(review => (
                    <tr key={review.id}>
                      <td>{review.attraction}</td>
                      <td>{review.user}</td>
                      <td>⭐ {review.rating}</td>
                      <td>{review.comment}</td>
                      <td>{getStatusBadge(review.status)}</td>
                      <td>{review.createdAt}</td>
                      <td>
                        <Button variant="outline-success" size="sm" className="me-2">
                          Approve
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete('review', review)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this {deleteType}? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
