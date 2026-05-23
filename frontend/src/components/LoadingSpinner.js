import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = 'md', variant = 'primary', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  return (
    <div className="loading-spinner">
      <Spinner 
        animation="border" 
        className={`spinner-border-custom ${sizeClasses[size]}`} 
        variant={variant}
      />
      {text && <div className="mt-3 text-muted">{text}</div>}
    </div>
  );
};

export default LoadingSpinner;
