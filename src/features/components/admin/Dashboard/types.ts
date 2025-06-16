export interface DashboardStats {
  totalEvents: number;
  totalCourses: number;
  activeUsers: number;
  revenue: string;
}

export interface Activity {
  action: string;
  time: string;
  type: 'user' | 'event' | 'course' | 'payment';
}

export interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}