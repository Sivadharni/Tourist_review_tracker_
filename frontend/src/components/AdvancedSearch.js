import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Button, 
  Collapse, 
  Row, 
  Col,
  Badge
} from 'react-bootstrap';
import { FaFilter, FaTimes } from 'react-icons/fa';

const AdvancedSearch = ({ onSearch, onReset, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    minRating: 0,
    maxRating: 5,
    minReviews: 0,
    categories: [],
    locations: [],
    priceRange: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const categories = [
    'Historical', 'Natural', 'Cultural', 'Adventure', 
    'Religious', 'Modern', 'Entertainment', 'Educational'
  ];

  const locations = [
    'Europe', 'Asia', 'North America', 'South America', 
    'Africa', 'Oceania', 'Antarctica'
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'free', label: 'Free' },
    { value: 'low', label: '$ (Low)' },
    { value: 'medium', label: '$$ (Medium)' },
    { value: 'high', label: '$$$ (High)' },
    { value: 'luxury', label: '$$$$ (Luxury)' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'rating', label: 'Rating' },
    { value: 'reviews', label: 'Number of Reviews' },
    { value: 'location', label: 'Location' }
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleLocationToggle = (location) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const emptyFilters = {
      searchTerm: '',
      minRating: 0,
      maxRating: 5,
      minReviews: 0,
      categories: [],
      locations: [],
      priceRange: 'all',
      sortBy: 'name',
      sortOrder: 'asc'
    };
    setFilters(emptyFilters);
    onReset();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchTerm) count++;
    if (filters.minRating > 0) count++;
    if (filters.maxRating < 5) count++;
    if (filters.minReviews > 0) count++;
    if (filters.categories.length > 0) count++;
    if (filters.locations.length > 0) count++;
    if (filters.priceRange !== 'all') count++;
    return count;
  };

  return (
    <div className="mb-4">
      {/* Search Bar with Advanced Toggle */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Search attractions, destinations, or keywords..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="search-input"
              />
            </Col>
            <Col md={4}>
              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={() => setIsOpen(!isOpen)}
                  className="d-flex align-items-center gap-2"
                >
                  <FaFilter />
                  Advanced
                  {getActiveFiltersCount() > 0 && (
                    <Badge bg="primary" pill>{getActiveFiltersCount()}</Badge>
                  )}
                </Button>
                <Button
                  variant="primary-custom"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  Search
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Advanced Filters Panel */}
      <Collapse in={isOpen}>
        <div className="mt-3">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Advanced Filters</h5>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleReset}
                >
                  <FaTimes className="me-1" />
                  Clear All
                </Button>
              </div>

              <Row>
                {/* Rating Filter */}
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-bold">Rating Range</Form.Label>
                  <Row className="align-items-center">
                    <Col>
                      <Form.Select
                        size="sm"
                        value={filters.minRating}
                        onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                      >
                        <option value={0}>Any</option>
                        <option value={1}>1+ Stars</option>
                        <option value={2}>2+ Stars</option>
                        <option value={3}>3+ Stars</option>
                        <option value={4}>4+ Stars</option>
                        <option value={4.5}>4.5+ Stars</option>
                      </Form.Select>
                    </Col>
                    <Col className="text-center">to</Col>
                    <Col>
                      <Form.Select
                        size="sm"
                        value={filters.maxRating}
                        onChange={(e) => handleFilterChange('maxRating', Number(e.target.value))}
                      >
                        <option value={5}>Any</option>
                        <option value={4.5}>4.5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>

                {/* Reviews Filter */}
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-bold">Minimum Reviews</Form.Label>
                  <Form.Select
                    size="sm"
                    value={filters.minReviews}
                    onChange={(e) => handleFilterChange('minReviews', Number(e.target.value))}
                  >
                    <option value={0}>Any</option>
                    <option value={10}>10+ Reviews</option>
                    <option value={50}>50+ Reviews</option>
                    <option value={100}>100+ Reviews</option>
                    <option value={500}>500+ Reviews</option>
                    <option value={1000}>1000+ Reviews</option>
                  </Form.Select>
                </Col>

                {/* Categories */}
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-bold">Categories</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={filters.categories.includes(category) ? 'primary' : 'outline-secondary'}
                        size="sm"
                        onClick={() => handleCategoryToggle(category)}
                        className="rounded-pill"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </Col>

                {/* Locations */}
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-bold">Continents</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {locations.map(location => (
                      <Button
                        key={location}
                        variant={filters.locations.includes(location) ? 'primary' : 'outline-secondary'}
                        size="sm"
                        onClick={() => handleLocationToggle(location)}
                        className="rounded-pill"
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </Col>

                {/* Price Range */}
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-bold">Price Range</Form.Label>
                  <Form.Select
                    size="sm"
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  >
                    {priceRanges.map(range => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </Form.Select>
                </Col>

                {/* Sort Options */}
                <Col md={6} className="mb-4">
                  <Form.Label className="fw-bold">Sort By</Form.Label>
                  <Row>
                    <Col>
                      <Form.Select
                        size="sm"
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Select
                        size="sm"
                        value={filters.sortOrder}
                        onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                      >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Action Buttons */}
              <div className="d-flex gap-2 justify-content-end">
                <Button
                  variant="outline-secondary"
                  onClick={handleReset}
                >
                  Reset Filters
                </Button>
                <Button
                  variant="primary-custom"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  Apply Filters
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Collapse>
    </div>
  );
};

export default AdvancedSearch;
