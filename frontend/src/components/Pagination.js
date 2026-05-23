import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  const items = [];
  const maxVisiblePages = 5;
  
  // Calculate page range to show
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Add first page and ellipsis
  if (startPage > 1) {
    items.push(
      <BootstrapPagination.Item key={1} onClick={() => onPageChange(1)} disabled={loading}>
        1
      </BootstrapPagination.Item>
    );
    if (startPage > 2) {
      items.push(
        <BootstrapPagination.Ellipsis key="start-ellipsis" disabled />
      );
    }
  }

  // Add page numbers
  for (let number = startPage; number <= endPage; number++) {
    items.push(
      <BootstrapPagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => onPageChange(number)}
        disabled={loading}
      >
        {number}
      </BootstrapPagination.Item>
    );
  }

  // Add ellipsis and last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      items.push(
        <BootstrapPagination.Ellipsis key="end-ellipsis" disabled />
      );
    }
    items.push(
      <BootstrapPagination.Item 
        key={totalPages} 
        onClick={() => onPageChange(totalPages)}
        disabled={loading}
      >
        {totalPages}
      </BootstrapPagination.Item>
    );
  }

  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.First 
          onClick={() => onPageChange(1)} 
          disabled={currentPage === 1 || loading}
        />
        <BootstrapPagination.Prev 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1 || loading}
        />
        {items}
        <BootstrapPagination.Next 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages || loading}
        />
        <BootstrapPagination.Last 
          onClick={() => onPageChange(totalPages)} 
          disabled={currentPage === totalPages || loading}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;
