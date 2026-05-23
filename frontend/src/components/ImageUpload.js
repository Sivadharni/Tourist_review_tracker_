import React, { useState, useRef } from 'react';
import { 
  Card, 
  Button, 
  Alert, 
  ProgressBar, 
  Image 
} from 'react-bootstrap';
import { 
  FaUpload, 
  FaImage, 
  FaTrash, 
  FaTimes 
} from 'react-icons/fa';

const ImageUpload = ({ 
  onImageUpload, 
  onImageRemove, 
  maxImages = 5, 
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  currentImages = [],
  className = ''
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPEG, PNG, or WebP images.');
      return false;
    }

    if (file.size > maxSize) {
      setError(`File size too large. Maximum size is ${maxSize / 1024 / 1024}MB.`);
      return false;
    }

    if (currentImages.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed.`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (files) => {
    setError('');
    
    if (files.length === 0) return;

    const file = files[0];
    
    if (!validateFile(file)) {
      return;
    }

    uploadImage(file);
  };

  const uploadImage = async (file) => {
    setUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // In production, make actual API call
      // const response = await axios.post('/api/upload', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      //   onUploadProgress: (progressEvent) => {
      //     const percentCompleted = Math.round(
      //       (progressEvent.loaded * 100) / progressEvent.total
      //     );
      //     setUploadProgress(percentCompleted);
      //   }
      // });

      // Mock upload
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Create object URL for preview
        const imageUrl = URL.createObjectURL(file);
        const imageData = {
          id: Date.now(),
          url: imageUrl,
          name: file.name,
          size: file.size,
          type: file.type
        };

        onImageUpload(imageData);
        setUploading(false);
        setUploadProgress(0);
      }, 2000);

    } catch (error) {
      setError('Failed to upload image. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files);
    }
  };

  const handleRemoveImage = (imageId) => {
    onImageRemove(imageId);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`image-upload ${className}`}>
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed ${dragActive ? 'border-primary bg-light' : 'border-secondary'} mb-3`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Card.Body className="text-center py-4">
          {uploading ? (
            <div>
              <FaUpload className="text-primary mb-3" style={{ fontSize: '2rem' }} />
              <h5>Uploading Image...</h5>
              <ProgressBar 
                now={uploadProgress} 
                className="mb-3" 
                style={{ height: '8px' }}
              />
              <small className="text-muted">{uploadProgress}%</small>
            </div>
          ) : (
            <div>
              <FaImage className="text-muted mb-3" style={{ fontSize: '2rem' }} />
              <h5>Upload Images</h5>
              <p className="text-muted mb-3">
                Drag & drop images here or click to browse
              </p>
              <p className="text-muted small mb-3">
                Maximum {maxImages} images • Max size {maxSize / 1024 / 1024}MB each
              </p>
              <Button 
                variant="outline-primary" 
                onClick={() => fileInputRef.current?.click()}
                disabled={currentImages.length >= maxImages}
              >
                <FaUpload className="me-2" />
                Choose Images
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes.join(',')}
                onChange={handleInputChange}
                style={{ display: 'none' }}
                disabled={currentImages.length >= maxImages}
              />
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Error Message */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Current Images */}
      {currentImages.length > 0 && (
        <div>
          <h6 className="mb-3">
            Uploaded Images ({currentImages.length}/{maxImages})
          </h6>
          <div className="row g-3">
            {currentImages.map((image) => (
              <div key={image.id} className="col-md-6 col-lg-4">
                <Card className="position-relative">
                  <div className="position-relative" style={{ paddingTop: '75%' }}>
                    <Image
                      src={image.url}
                      alt={image.name}
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{ objectFit: 'cover' }}
                      thumbnail
                    />
                  </div>
                  <Card.Body className="p-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-truncate flex-grow-1 me-2">
                        <small className="text-muted d-block">{image.name}</small>
                        <small className="text-muted">{formatFileSize(image.size)}</small>
                      </div>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveImage(image.id)}
                        className="flex-shrink-0"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="mt-3">
        <small className="text-muted">
          <strong>Upload Guidelines:</strong>
          <ul className="mb-0">
            <li>Use high-quality images for best results</li>
            <li>Ensure images are relevant to the attraction</li>
            <li>Avoid copyrighted material</li>
            <li>Recommended aspect ratio: 16:9 or 4:3</li>
          </ul>
        </small>
      </div>
    </div>
  );
};

export default ImageUpload;
