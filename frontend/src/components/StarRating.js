import React from 'react';

const StarRating = ({ rating, interactive = false, onRatingChange, size = '1rem' }) => {
  const stars = [1, 2, 3, 4, 5];

  if (interactive) {
    return (
      <div className="star-rating">
        {stars.map(star => (
          <button
            key={star}
            className={`star-btn ${star <= rating ? 'active' : ''}`}
            onClick={() => onRatingChange(star)}
            style={{ fontSize: size }}
          >
            ★
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="rating-display">
      {stars.map(star => (
        <span 
          key={star} 
          className={`star ${star <= rating ? '' : 'empty'}`}
          style={{ fontSize: size }}
        >
          ★
        </span>
      ))}
      <span className="rating-text" style={{ marginLeft: '0.5rem', fontSize: size }}>
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

export default StarRating;
