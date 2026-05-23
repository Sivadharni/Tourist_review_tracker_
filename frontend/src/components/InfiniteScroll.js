import React, { useState, useEffect, useRef, useCallback } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const InfiniteScroll = ({ 
  children, 
  loading, 
  hasMore, 
  onLoadMore, 
  loader,
  endMessage,
  threshold = 100 
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef();
  const lastElementRef = useRef();

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading && !isFetching) {
      setIsFetching(true);
      onLoadMore();
    }
  }, [hasMore, loading, isFetching, onLoadMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: threshold / 100
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);

    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold]);

  useEffect(() => {
    if (!loading && isFetching) {
      setIsFetching(false);
    }
  }, [loading, isFetching]);

  const defaultLoader = (
    <div className="text-center py-4">
      <Spinner animation="border" variant="primary" />
      <div className="mt-2 text-muted">Loading more...</div>
    </div>
  );

  const defaultEndMessage = (
    <div className="text-center py-4 text-muted">
      <p className="mb-0">🎉 You've reached the end!</p>
    </div>
  );

  return (
    <>
      {children}
      <div ref={lastElementRef} style={{ height: '1px' }} />
      {loading && (loader || defaultLoader)}
      {!hasMore && !loading && (endMessage || defaultEndMessage)}
    </>
  );
};

export default InfiniteScroll;
