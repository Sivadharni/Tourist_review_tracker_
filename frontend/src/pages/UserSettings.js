import { Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ProtectedRoute from '../components/ProtectedRoute';

const UserSettings = () => {
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    website: '',
    avatar: ''
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    reviewReplies: true,
    newFollowers: false,
    weeklyDigest: true,
    marketingEmails: false,
    pushNotifications: true
  });
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    allowFollowers: true,
    showReviews: true
  });
  
  // Preferences
  const [preferences, setPreferences] = useState({
    language: 'en',
    timezone: 'UTC',
    theme: 'light',
    itemsPerPage: 12,
    defaultView: 'grid'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) return;

    const fetchUserSettings = async () => {
      try {
        // In production, replace with actual API call
        // const response = await axios.get('/api/users/settings');
        
        // Using mock data for now
        setTimeout(() => {
          setProfileData({
            username: user.username || '',
            email: user.email || '',
            firstName: 'John',
            lastName: 'Doe',
            bio: 'Travel enthusiast and photography lover',
            location: 'New York, USA',
            website: 'https://example.com',
            avatar: ''
          });
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        showError('Failed to load settings');
        setLoading(false);
      }
    };

    fetchUserSettings();
  }, [user, showError]);

  const validateProfile = () => {
    const newErrors = {};
    
    if (!profileData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (profileData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfile()) {
      return;
    }

    setSaving(true);

    try {
      // In production, replace with actual API call
      // await axios.put('/api/users/profile', profileData);
      
      // Mock API call
      setTimeout(() => {
        showSuccess('Profile updated successfully!');
        setSaving(false);
      }, 1000);
      
    } catch (error) {
      showError('Failed to update profile');
      setSaving(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // In production, replace with actual API call
      // await axios.put('/api/users/notifications', notificationSettings);
      
      // Mock API call
      setTimeout(() => {
        showSuccess('Notification preferences updated!');
        setSaving(false);
      }, 1000);
      
    } catch (error) {
      showError('Failed to update notification preferences');
      setSaving(false);
    }
  };

  const handlePrivacySubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // In production, replace with actual API call
      // await axios.put('/api/users/privacy', privacySettings);
      
      // Mock API call
      setTimeout(() => {
        showSuccess('Privacy settings updated!');
        setSaving(false);
      }, 1000);
      
    } catch (error) {
      showError('Failed to update privacy settings');
      setSaving(false);
    }
  };

  const handlePreferenceSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // In production, replace with actual API call
      // await axios.put('/api/users/preferences', preferences);
      
      // Mock API call
      setTimeout(() => {
        showSuccess('Preferences updated!');
        setSaving(false);
      }, 1000);
      
    } catch (error) {
      showError('Failed to update preferences');
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');

    if (!currentPassword || !newPassword || !confirmPassword) {
      showError('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      showError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }

    setSaving(true);

    try {
      // In production, replace with actual API call
      // await axios.put('/api/users/password', {
      //   currentPassword,
      //   newPassword
      // });
      
      // Mock API call
      setTimeout(() => {
        showSuccess('Password changed successfully!');
        setSaving(false);
        e.target.reset();
      }, 1000);
      
    } catch (error) {
      showError('Failed to change password');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" className="spinner-border-custom" variant="primary" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="mb-4">Settings</h1>
            
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4"
            >
              <Tab eventKey="profile" title="Profile">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="mb-4">Profile Information</h5>
                    
                    <Form onSubmit={handleProfileSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              name="username"
                              value={profileData.username}
                              onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                              isInvalid={!!errors.username}
                              disabled={saving}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                              isInvalid={!!errors.email}
                              disabled={saving}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                              disabled={saving}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={profileData.lastName}
                              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                              disabled={saving}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          disabled={saving}
                          maxLength={500}
                        />
                        <Form.Text className="text-muted">
                          {profileData.bio.length}/500 characters
                        </Form.Text>
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                              type="text"
                              name="location"
                              value={profileData.location}
                              onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                              disabled={saving}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Website</Form.Label>
                            <Form.Control
                              type="url"
                              name="website"
                              value={profileData.website}
                              onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                              disabled={saving}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        type="submit"
                        variant="primary-custom"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                            Saving...
                          </>
                        ) : (
                          'Save Profile'
                        )}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="notifications" title="Notifications">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="mb-4">Notification Preferences</h5>
                    
                    <Form onSubmit={handleNotificationSubmit}>
                      <div className="mb-3">
                        <Form.Check
                          type="switch"
                          id="emailNotifications"
                          label="Email Notifications"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications: e.target.checked
                          })}
                          disabled={saving}
                        />
                        <Form.Text className="text-muted">
                          Receive email notifications about your account activity
                        </Form.Text>
                      </div>

                      <div className="mb-3">
                        <Form.Check
                          type="switch"
                          id="reviewReplies"
                          label="Review Replies"
                          checked={notificationSettings.reviewReplies}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            reviewReplies: e.target.checked
                          })}
                          disabled={saving}
                        />
                        <Form.Text className="text-muted">
                          Get notified when someone replies to your reviews
                        </Form.Text>
                      </div>

                      <div className="mb-3">
                        <Form.Check
                          type="switch"
                          id="newFollowers"
                          label="New Followers"
                          checked={notificationSettings.newFollowers}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            newFollowers: e.target.checked
                          })}
                          disabled={saving}
                        />
                        <Form.Text className="text-muted">
                          Get notified when someone follows you
                        </Form.Text>
                      </div>

                      <div className="mb-3">
                        <Form.Check
                          type="switch"
                          id="weeklyDigest"
                          label="Weekly Digest"
                          checked={notificationSettings.weeklyDigest}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            weeklyDigest: e.target.checked
                          })}
                          disabled={saving}
                        />
                        <Form.Text className="text-muted">
                          Receive a weekly summary of popular attractions and reviews
                        </Form.Text>
                      </div>

                      <div className="mb-4">
                        <Form.Check
                          type="switch"
                          id="marketingEmails"
                          label="Marketing Emails"
                          checked={notificationSettings.marketingEmails}
                          onChange={(e) => setNotificationSettings({
                            ...notificationSettings,
                            marketingEmails: e.target.checked
                          })}
                          disabled={saving}
                        />
                        <Form.Text className="text-muted">
                          Receive emails about new features and special offers
                        </Form.Text>
                      </div>

                      <Button
                        type="submit"
                        variant="primary-custom"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                            Saving...
                          </>
                        ) : (
                          'Save Notification Settings'
                        )}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="privacy" title="Privacy">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="mb-4">Privacy Settings</h5>
                    
                    <Form onSubmit={handlePrivacySubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Profile Visibility</Form.Label>
                        <Form.Select
                          value={privacySettings.profileVisibility}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            profileVisibility: e.target.value
                          })}
                          disabled={saving}
                        >
                          <option value="public">Public</option>
                          <option value="friends">Friends Only</option>
                          <option value="private">Private</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                          Control who can see your profile information
                        </Form.Text>
                      </Form.Group>

                      <div className="mb-3">
                        <Form.Check
                          type="switch"
                          id="showEmail"
                          label="Show Email Address"
                          checked={privacySettings.showEmail}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            showEmail: e.target.checked
                          })}
                          disabled={saving}
                        />
                        <Form.Text className="text-muted">
                          Display your email address on your public profile
                        </Form.Text>
                      </div>

                      <div className="mb-3">
                        <Form.Check
                          type="switch"
                          id="showLocation"
                          label="Show Location"
                          checked={privacySettings.showLocation}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            showLocation: e.target.checked
                          })}
                          disabled={saving}
                        />
                        <Form.Text className="text-muted">
                          Display your location on your public profile
                        </Form.Text>
                      </div>

                      <div className="mb-4">
                        <Form.Check
                          type="switch"
                          id="allowFollowers"
                          label="Allow Followers"
                          checked={privacySettings.allowFollowers}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            allowFollowers: e.target.checked
                          })}
                          disabled={saving}
                        />
                        <Form.Text className="text-muted">
                          Allow other users to follow your activity
                        </Form.Text>
                      </div>

                      <Button
                        type="submit"
                        variant="primary-custom"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                            Saving...
                          </>
                        ) : (
                          'Save Privacy Settings'
                        )}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="preferences" title="Preferences">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="mb-4">User Preferences</h5>
                    
                    <Form onSubmit={handlePreferenceSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Language</Form.Label>
                            <Form.Select
                              value={preferences.language}
                              onChange={(e) => setPreferences({
                                ...preferences,
                                language: e.target.value
                              })}
                              disabled={saving}
                            >
                              <option value="en">English</option>
                              <option value="es">Español</option>
                              <option value="fr">Français</option>
                              <option value="de">Deutsch</option>
                              <option value="zh">中文</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Timezone</Form.Label>
                            <Form.Select
                              value={preferences.timezone}
                              onChange={(e) => setPreferences({
                                ...preferences,
                                timezone: e.target.value
                              })}
                              disabled={saving}
                            >
                              <option value="UTC">UTC</option>
                              <option value="EST">Eastern Time</option>
                              <option value="PST">Pacific Time</option>
                              <option value="GMT">Greenwich Mean Time</option>
                              <option value="CET">Central European Time</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Theme</Form.Label>
                            <Form.Select
                              value={preferences.theme}
                              onChange={(e) => setPreferences({
                                ...preferences,
                                theme: e.target.value
                              })}
                              disabled={saving}
                            >
                              <option value="light">Light</option>
                              <option value="dark">Dark</option>
                              <option value="auto">Auto</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Items per Page</Form.Label>
                            <Form.Select
                              value={preferences.itemsPerPage}
                              onChange={(e) => setPreferences({
                                ...preferences,
                                itemsPerPage: parseInt(e.target.value)
                              })}
                              disabled={saving}
                            >
                              <option value="6">6</option>
                              <option value="12">12</option>
                              <option value="24">24</option>
                              <option value="48">48</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-4">
                        <Form.Label>Default View</Form.Label>
                        <Form.Select
                          value={preferences.defaultView}
                          onChange={(e) => setPreferences({
                            ...preferences,
                            defaultView: e.target.value
                          })}
                          disabled={saving}
                        >
                          <option value="grid">Grid View</option>
                          <option value="list">List View</option>
                        </Form.Select>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary-custom"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                            Saving...
                          </>
                        ) : (
                          'Save Preferences'
                        )}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="security" title="Security">
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="mb-4">Security Settings</h5>
                    
                    <Form onSubmit={handlePasswordChange}>
                      <h6 className="mb-3">Change Password</h6>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="currentPassword"
                          required
                          disabled={saving}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          required
                          disabled={saving}
                          minLength={6}
                        />
                        <Form.Text className="text-muted">
                          Password must be at least 6 characters long
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          required
                          disabled={saving}
                        />
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="primary-custom"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                            Updating...
                          </>
                        ) : (
                          'Change Password'
                        )}
                      </Button>
                    </Form>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="mb-1">Delete Account</h6>
                        <p className="text-muted small mb-0">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button variant="outline-danger" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </Container>
    </ProtectedRoute>
  );
};

export default UserSettings;
