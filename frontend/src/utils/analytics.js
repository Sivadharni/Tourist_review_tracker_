// Basic Analytics and User Tracking Utility

class Analytics {
  constructor() {
    this.isInitialized = false;
    this.userId = null;
    this.sessionId = this.generateSessionId();
    this.events = [];
    this.pageViews = [];
  }

  // Initialize analytics
  init(userId = null) {
    this.userId = userId;
    this.isInitialized = true;
    
    // Track session start
    this.trackEvent('session_start', {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    });

    // Track initial page view
    this.trackPageView(window.location.pathname);

    // Setup page view tracking for SPA
    this.setupPageViewTracking();
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Setup automatic page view tracking for SPA
  setupPageViewTracking() {
    // Track page changes in React Router
    let lastPath = window.location.pathname;
    
    const checkPathChange = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath) {
        lastPath = currentPath;
        this.trackPageView(currentPath);
      }
    };

    // Check for path changes every 100ms
    setInterval(checkPathChange, 100);

    // Track browser back/forward
    window.addEventListener('popstate', () => {
      this.trackPageView(window.location.pathname);
    });
  }

  // Track page views
  trackPageView(path) {
    if (!this.isInitialized) return;

    const pageViewData = {
      path,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      title: document.title,
      referrer: document.referrer
    };

    this.pageViews.push(pageViewData);

    // In production, send to analytics server
    this.sendToServer('page_view', pageViewData);

    console.log('Analytics: Page View Tracked', pageViewData);
  }

  // Track custom events
  trackEvent(eventName, properties = {}) {
    if (!this.isInitialized) return;

    const eventData = {
      eventName,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      path: window.location.pathname
    };

    this.events.push(eventData);

    // In production, send to analytics server
    this.sendToServer('event', eventData);

    console.log('Analytics: Event Tracked', eventData);
  }

  // Track user interactions
  trackInteraction(action, target, properties = {}) {
    this.trackEvent('user_interaction', {
      action,
      target,
      ...properties
    });
  }

  // Track search queries
  trackSearch(query, filters = {}) {
    this.trackEvent('search', {
      query,
      filters,
      resultsCount: filters.resultsCount || 0
    });
  }

  // Track review submissions
  trackReview(attractionId, rating) {
    this.trackEvent('review_submitted', {
      attractionId,
      rating
    });
  }

  // Track attraction views
  trackAttractionView(attractionId) {
    this.trackEvent('attraction_view', {
      attractionId
    });
  }

  // Track user engagement
  trackEngagement(type, duration, target) {
    this.trackEvent('engagement', {
      type,
      duration,
      target
    });
  }

  // Track errors
  trackError(error, context = {}) {
    this.trackEvent('error', {
      message: error.message,
      stack: error.stack,
      context
    });
  }

  // Send data to server (mock implementation)
  async sendToServer(type, data) {
    // In production, this would send to your analytics backend
    try {
      // Mock API call
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ type, data })
      // });

      // For development, just log to console
      console.log(`Analytics Data (${type}):`, data);
    } catch (error) {
      console.error('Failed to send analytics data:', error);
    }
  }

  // Get session stats
  getSessionStats() {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - parseInt(this.sessionId.split('_')[1]),
      pageViews: this.pageViews.length,
      events: this.events.length,
      startTime: new Date(parseInt(this.sessionId.split('_')[1]))
    };
  }

  // Export analytics data
  exportData() {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      pageViews: this.pageViews,
      events: this.events,
      sessionStats: this.getSessionStats()
    };
  }
}

// Create singleton instance
const analytics = new Analytics();

export default analytics;
