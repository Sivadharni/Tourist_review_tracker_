import React from 'react';
import { Button } from 'react-bootstrap';

const EmptyState = ({ 
  icon = '📭', 
  title = 'No Data Found', 
  text = 'There is nothing to show here.', 
  actionText, 
  onActionClick,
  actionVariant = 'primary-custom' 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{text}</p>
      {actionText && onActionClick && (
        <Button 
          variant={actionVariant} 
          onClick={onActionClick}
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
