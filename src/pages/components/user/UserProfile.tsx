import UserProfile from '../../../features/components/user/profile/UserProfile' // Import UserProfile
// ... other imports

// In your router definition:
export const UserProfilepage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <UserProfile />
    </div>
  );
};