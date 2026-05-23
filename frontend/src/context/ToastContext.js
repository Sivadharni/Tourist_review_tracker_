import React, { createContext, useContext, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newToast = {
      id,
      message,
      type,
      show: true
    };
    
    setToasts(prev => [...prev, newToast]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, show: false } : toast
      )
    );
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  };

  const showSuccess = (message, duration) => addToast(message, 'success', duration);
  const showError = (message, duration) => addToast(message, 'danger', duration);
  const showWarning = (message, duration) => addToast(message, 'warning', duration);
  const showInfo = (message, duration) => addToast(message, 'info', duration);

  const value = {
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            show={toast.show}
            onClose={() => removeToast(toast.id)}
            className={`toast-custom bg-${toast.type} text-white`}
            delay={3000}
            autohide
          >
            <Toast.Header className={`bg-${toast.type} text-white`}>
              <strong className="me-auto">
                {toast.type === 'success' && '✓ Success'}
                {toast.type === 'danger' && '✗ Error'}
                {toast.type === 'warning' && '⚠ Warning'}
                {toast.type === 'info' && 'ℹ Info'}
              </strong>
            </Toast.Header>
            <Toast.Body>
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastContext;
