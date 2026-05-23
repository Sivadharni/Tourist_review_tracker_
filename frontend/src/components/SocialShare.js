import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { 
  FaFacebook, 
  FaTwitter, 
  FaWhatsapp, 
  FaLink, 
  FaEnvelope,
  FaShareAlt
} from 'react-icons/fa';
import { useToast } from '../context/ToastContext';

const SocialShare = ({ 
  url, 
  title, 
  description, 
  image,
  className = '',
  variant = 'outline-primary',
  size = 'sm'
}) => {
  const { showSuccess, showError } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get current URL if not provided
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this amazing attraction!';
  const shareDescription = description || 'Discover amazing places and share your travel experiences';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareTitle)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareDescription}\n\n${shareUrl}`)}`
  };

  const handleShare = (platform) => {
    const link = shareLinks[platform];
    if (platform === 'email') {
      window.location.href = link;
    } else {
      window.open(link, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showSuccess('Link copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        showSuccess('Link copied to clipboard!');
        
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (error) {
        showError('Failed to copy link');
      }
      
      document.body.removeChild(textArea);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl
        });
        showSuccess('Shared successfully!');
      } catch (error) {
        if (error.name !== 'AbortError') {
          showError('Failed to share');
        }
      }
    } else {
      // Fallback to modal
      setShowModal(true);
    }
  };

  return (
    <>
      <div className={`social-share ${className}`}>
        {/* Native Share Button (Mobile) */}
        {navigator.share && (
          <Button
            variant={variant}
            size={size}
            onClick={handleNativeShare}
            className="me-2"
          >
            <FaShareAlt className="me-2" />
            Share
          </Button>
        )}

        {/* Desktop Share Button */}
        {!navigator.share && (
          <Button
            variant={variant}
            size={size}
            onClick={() => setShowModal(true)}
            className="me-2"
          >
            <FaShareAlt className="me-2" />
            Share
          </Button>
        )}
      </div>

      {/* Share Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Share this attraction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <h5>{shareTitle}</h5>
            <p className="text-muted">{shareDescription}</p>
          </div>

          <div className="d-grid gap-2">
            {/* Facebook */}
            <Button
              variant="primary"
              onClick={() => handleShare('facebook')}
              className="d-flex align-items-center justify-content-center"
            >
              <FaFacebook className="me-2" />
              Share on Facebook
            </Button>

            {/* Twitter */}
            <Button
              variant="info"
              onClick={() => handleShare('twitter')}
              className="d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#1DA1F2', borderColor: '#1DA1F2' }}
            >
              <FaTwitter className="me-2" />
              Share on Twitter
            </Button>

            {/* WhatsApp */}
            <Button
              variant="success"
              onClick={() => handleShare('whatsapp')}
              className="d-flex align-items-center justify-content-center"
              style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
            >
              <FaWhatsapp className="me-2" />
              Share on WhatsApp
            </Button>

            {/* Email */}
            <Button
              variant="secondary"
              onClick={() => handleShare('email')}
              className="d-flex align-items-center justify-content-center"
            >
              <FaEnvelope className="me-2" />
              Share via Email
            </Button>

            {/* Copy Link */}
            <Button
              variant={copied ? 'success' : 'outline-secondary'}
              onClick={handleCopyLink}
              className="d-flex align-items-center justify-content-center"
            >
              <FaLink className="me-2" />
              {copied ? 'Link Copied!' : 'Copy Link'}
            </Button>
          </div>

          {/* Preview */}
          <div className="mt-4 p-3 bg-light rounded">
            <h6 className="mb-2">Preview:</h6>
            <div className="d-flex align-items-start">
              {image && (
                <img
                  src={image}
                  alt={shareTitle}
                  className="me-3"
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                />
              )}
              <div className="flex-grow-1">
                <div className="fw-bold small">{shareTitle}</div>
                <div className="text-muted small">{shareDescription}</div>
                <div className="text-muted small text-truncate">{shareUrl}</div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SocialShare;
