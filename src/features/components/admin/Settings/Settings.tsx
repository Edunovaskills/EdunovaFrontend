import React, { useState, useEffect } from 'react';
import { adminStyles } from '../AdminStyles';
import { settingsStyles } from './settingsStyles';
import { User } from '../Users/users.api';

export const Settings: React.FC = () => {
  // Demo admin data
  const defaultAdminData: Partial<User> = {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    joinDate: '2024-01-01',
  };

  // Initialize formData from localStorage or defaultAdminData
  const [formData, setFormData] = useState<Partial<User>>(() => {
    const savedData = localStorage.getItem('adminProfile');
    return savedData ? JSON.parse(savedData) : defaultAdminData;
  });

  // State for password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle password form input changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Basic validation
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        throw new Error('All fields are required');
      }
      if (passwordData.newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New password and confirmation do not match');
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear form on success
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setSuccessMessage('Password updated successfully!');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine theme from document.body
  const theme = document.body.getAttribute('data-theme') || 'light';

  return (
    <div style={{ ...adminStyles.container, backgroundColor: theme === 'light' ? '#ffffff' : '#1f2a44' }}>
      <h2 style={{ ...adminStyles.header, color: theme === 'light' ? '#1e293b' : '#f1f5f9' }}>
        Admin Profile
      </h2>
      <div style={settingsStyles.card}>
        <h3 style={settingsStyles.sectionTitle}>Profile Details</h3>
        <div style={settingsStyles.form}>
          <div style={settingsStyles.formGroup}>
            <label style={settingsStyles.label}>Name</label>
            <div style={settingsStyles.readOnlyText}>{formData.name || 'N/A'}</div>
          </div>
          <div style={settingsStyles.formGroup}>
            <label style={settingsStyles.label}>Email</label>
            <div style={settingsStyles.readOnlyText}>{formData.email || 'N/A'}</div>
          </div>
          <div style={settingsStyles.formGroup}>
            <label style={settingsStyles.label}>Join Date</label>
            <div style={settingsStyles.readOnlyText}>{formData.joinDate || 'N/A'}</div>
          </div>
        </div>
      </div>

      <div style={settingsStyles.card}>
        <h3 style={settingsStyles.sectionTitle}>Change Password</h3>
        <form onSubmit={handlePasswordSubmit} style={settingsStyles.form}>
          <div style={settingsStyles.formGroup}>
            <label htmlFor="currentPassword" style={settingsStyles.label}>Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              style={settingsStyles.input}
              placeholder="Enter current password"
              disabled={isSubmitting}
              required
            />
          </div>
          <div style={settingsStyles.formGroup}>
            <label htmlFor="newPassword" style={settingsStyles.label}>New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              style={settingsStyles.input}
              placeholder="Enter new password"
              disabled={isSubmitting}
              required
            />
          </div>
          <div style={settingsStyles.formGroup}>
            <label htmlFor="confirmPassword" style={settingsStyles.label}>Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              style={settingsStyles.input}
              placeholder="Confirm new password"
              disabled={isSubmitting}
              required
            />
          </div>
          {errorMessage && (
            <div style={settingsStyles.errorMessage}>{errorMessage}</div>
          )}
          {successMessage && (
            <div style={settingsStyles.successMessage}>{successMessage}</div>
          )}
          <button
            type="submit"
            style={{
              ...settingsStyles.submitButton,
              background: isSubmitting
                ? 'linear-gradient(180deg, #e2e8f0, #d1d5db)'
                : 'linear-gradient(180deg, #3b82f6, #2563eb)',
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};