export interface LoginData {
  email: string
  password: string
}

export interface SignupData extends LoginData {
  name: string
}

// New: Define the User interface based on the expected data from your backend
export interface User {
  _id: string; // Assuming an ID for the user
  name: string;
  email: string;
  role: 'user' | 'admin'; // Or other roles you might have
  phone?: string; // Optional field
  // Add any other user-related fields returned by your backend
  createdAt: string;
  updatedAt: string;
}