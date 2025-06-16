import React from 'react';
import { useUserProfile } from '../auth/hooks/useUserProfile';

const UserProfile: React.FC = () => {
  const { user, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-6">
        <p>No user data found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <div className="space-y-3">
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Phone:</span> {user.phone || 'N/A'}</p>
        <p><span className="font-semibold">Role:</span> {user.role || 'User'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
