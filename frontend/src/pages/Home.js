import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import Pagination from '../components/Pagination';
import InfiniteScroll from '../components/InfiniteScroll';
import AdvancedSearch from '../components/AdvancedSearch';
import { useToast } from '../context/ToastContext';

const Home = () => {
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'rating', 'reviews'
  const [advancedFilters, setAdvancedFilters] = useState(null);
  const { showError } = useToast();

  const itemsPerPage = 6;

  // Extended mock data for demonstration
  const generateMockAttractions = (startId = 1, count = 20) => {
    const attractions = [];
    const locations = [
      "Paris, France", "New York, USA", "Beijing, China", "Cusco, Peru", 
      "Rome, Italy", "Agra, India", "London, UK", "Tokyo, Japan",
      "Barcelona, Spain", "Dubai, UAE", "Sydney, Australia", "Cairo, Egypt"
    ];
    const names = [
      "Eiffel Tower", "Statue of Liberty", "Great Wall of China", "Machu Picchu",
      "Colosseum", "Taj Mahal", "Big Ben", "Tokyo Tower", "Sagrada Familia",
      "Burj Khalifa", "Sydney Opera House", "Pyramids of Giza", "Louvre Museum",
      "Golden Gate Bridge", "Christ the Redeemer", "Petra", "Angkor Wat"
    ];
    
    for (let i = 0; i < count; i++) {
      const id = startId + i;
      const nameIndex = (id - 1) % names.length;
      const locationIndex = (id - 1) % locations.length;
      
      attractions.push({
        id,
        name: names[nameIndex] + (id > names.length ? ` ${Math.ceil(id / names.length)}` : ''),
        location: locations[locationIndex],
        description: `Amazing destination with breathtaking views and unforgettable experiences. Perfect for travelers seeking adventure and cultural enrichment.`,
        imageUrl: `https://picsum.photos/seed/attraction${id}/400/300`,
        averageRating: Math.round((Math.random() * 2 + 3) * 10) / 10,
        reviewCount: Math.floor(Math.random() * 5000) + 100
      });
    }
    
    return attractions;
  };

  const fetchAttractions = useCallback(async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      // In production, replace with actual API call
      // const response = await axios.get('/api/attractions', {
      //   params: { page, limit: itemsPerPage, search: searchTerm, sort: sortBy }
      // });
      
      // Using mock data for now
      setTimeout(() => {
        const newAttractions = generateMockAttractions((page - 1) * itemsPerPage + 1, itemsPerPage);
        const totalItems = 50; // Mock total items
        const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
        
        if (append) {
          setAttractions(prev => [...prev, ...newAttractions]);
        } else {
          setAttractions(newAttractions);
        }
        
        setTotalPages(calculatedTotalPages);
        setHasMore(page < calculatedTotalPages);
        setCurrentPage(page);
        setLoading(false);
        setLoadingMore(false);
      }, 800);
    } catch (error) {
      showError('Failed to load attractions');
      setLoading(false);
      setLoadingMore(false);
    }
  }, [searchTerm, sortBy, showError]);

  useEffect(() => {
    fetchAttractions(1, false);
  }, [fetchAttractions]);

  useEffect(() => {
    let filtered = [...attractions];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(attraction =>
        attraction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });
    
    setFilteredAttractions(filtered);
  }, [attractions, searchTerm, sortBy]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    fetchAttractions(page, false);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchAttractions(currentPage + 1, true);
    }
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  if (loading && attractions.length === 0) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" className="spinner-border-custom" variant="primary" />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <h1 className="hero-title">Discover Amazing Places</h1>
          <p className="hero-subtitle">Explore, Review, and Share Your Travel Experiences</p>
        </Container>
      </section>

      {/* Advanced Search */}
      <Container className="py-4">
        <AdvancedSearch
          onSearch={(filters) => {
            setAdvancedFilters(filters);
            setSearchTerm(filters.searchTerm);
            setSortBy(filters.sortBy);
            setCurrentPage(1);
            fetchAttractions(1, false);
          }}
          onReset={() => {
            setAdvancedFilters(null);
            setSearchTerm('');
            setSortBy('name');
            setCurrentPage(1);
            fetchAttractions(1, false);
          }}
          loading={loading || loadingMore}
        />
      </Container>

      {/* View Controls */}
      <Container className="pb-4">
        <Row className="align-items-center">
          <Col md={6}>
            <div className="d-flex gap-2 align-items-center">
              <span className="text-muted">View:</span>
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <span>⊞</span> Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <span>☰</span> List
              </Button>
            </div>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="text-muted">
              {filteredAttractions.length} attractions found
            </div>
          </Col>
        </Row>
      </Container>

      {/* Attractions Display */}
      <Container className="pb-5">
        {filteredAttractions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3 className="empty-state-title">No attractions found</h3>
            <p className="empty-state-text">
              Try adjusting your search terms or browse all attractions
            </p>
            <Button 
              variant="outline-custom" 
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <InfiniteScroll
                loading={loadingMore}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              >
                <Row className="g-4">
                  {filteredAttractions.map(attraction => (
                    <Col key={attraction.id} md={6} lg={4}>
                      <Card className="attraction-card">
                        <div style={{ overflow: 'hidden' }}>
                          <Card.Img 
                            variant="top" 
                            src={attraction.imageUrl} 
                            alt={attraction.name}
                            style={{ height: '200px', objectFit: 'cover' }}
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
                          <StarRating rating={attraction.averageRating} size="1rem" />
                          <div className="text-muted small mb-3">
                            {attraction.reviewCount} reviews
                          </div>
                          <Card.Text className="text-muted small">
                            {attraction.description.substring(0, 100)}...
                          </Card.Text>
                          <Link to={`/attraction/${attraction.id}`}>
                            <Button variant="primary-custom" className="w-100">
                              View Details
                            </Button>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </InfiniteScroll>
            ) : (
              <div className="list-view">
                {filteredAttractions.map(attraction => (
                  <Card key={attraction.id} className="mb-3 attraction-card">
                    <Row className="g-0">
                      <Col md={3}>
                        <Card.Img 
                          src={attraction.imageUrl} 
                          alt={attraction.name}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col md={9}>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <Card.Title className="attraction-title mb-2">
                                {attraction.name}
                              </Card.Title>
                              <div className="attraction-location mb-2">
                                <span style={{ marginRight: '0.5rem' }}>📍</span>
                                {attraction.location}
                              </div>
                              <StarRating rating={attraction.averageRating} size="1rem" />
                              <div className="text-muted small mb-2">
                                {attraction.reviewCount} reviews
                              </div>
                              <Card.Text className="text-muted">
                                {attraction.description}
                              </Card.Text>
                            </div>
                            <div>
                              <Link to={`/attraction/${attraction.id}`}>
                                <Button variant="primary-custom">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination for non-infinite scroll */}
            {!viewMode === 'grid' && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )}
          </>
        )}
      </Container>

      {/* Tech Stack Section */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="text-center mb-5" style={{ color: 'var(--gray-dark)' }}>
            Built with Modern Technology
          </h2>
          <Row className="g-4 text-center">
            <Col md={3} sm={6}>
              <div className="p-3">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚛️</div>
                <h5>React.js</h5>
                <p className="text-muted small">Frontend Framework</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍃</div>
                <h5>Spring Boot</h5>
                <p className="text-muted small">Backend API</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗄️</div>
                <h5>MySQL</h5>
                <p className="text-muted small">Database</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
                <h5>JWT Auth</h5>
                <p className="text-muted small">Security</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
