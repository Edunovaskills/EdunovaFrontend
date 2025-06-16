// index.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { analyticsStyles } from './styles.component';
import { fetchUsers, User } from '../Users/users.api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const Analytics: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err); // More detailed error logging
        setError('Failed to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Process user join dates for chart
  const getChartData = () => {
    const joinCounts: { [key: string]: number } = {};

    users.forEach((user) => {
      const date = new Date(user.joinDate);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'short' });
      const key = `${month} ${year}`;
      joinCounts[key] = (joinCounts[key] || 0) + 1;
    });

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels: string[] = [];
    const data: number[] = [];

    // Include all months for 2024 and 2025
    [2024, 2025].forEach((year) => {
      months.forEach((month) => {
        const key = `${month} ${year}`;
        labels.push(key);
        data.push(joinCounts[key] || 0);
      });
    });

    return {
      labels,
      datasets: [
        {
          label: 'User Joinings',
          data,
          // Using a more modern, slightly muted blue
          borderColor: 'rgb(75, 137, 220)',
          backgroundColor: 'rgba(75, 137, 220, 0.3)',
          fill: true,
          tension: 0.4, // Smooths the line
          pointBackgroundColor: 'rgb(75, 137, 220)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 137, 220)',
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to fill its container
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            family: 'Inter, sans-serif', // Assuming a modern font
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: 'User Joinings Over Time (2024-2025)',
        font: {
          size: 20,
          weight: 'bold',
          family: 'Inter, sans-serif',
        },
        color: '#333',
        padding: {
            top: 10,
            bottom: 20,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        bodyFont: {
            size: 14,
            family: 'Inter, sans-serif',
        },
        titleFont: {
            size: 16,
            family: 'Inter, sans-serif',
            weight: 'bold',
        },
        padding: 10,
        cornerRadius: 4,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Users',
          font: {
            size: 16,
            family: 'Inter, sans-serif',
          },
          color: '#555',
        },
        ticks: {
            font: {
                size: 12,
                family: 'Inter, sans-serif',
            },
            color: '#666',
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.05)', // Lighter grid lines
        }
      },
      x: {
        title: {
          display: true,
          text: 'Month and Year',
          font: {
            size: 16,
            family: 'Inter, sans-serif',
          },
          color: '#555',
        },
        ticks: {
            font: {
                size: 12,
                family: 'Inter, sans-serif',
            },
            color: '#666',
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.05)',
        }
      },
    },
  };

  if (loading) {
    return <div style={analyticsStyles.placeholder}>Loading analytics data...</div>;
  }

  if (error) {
    return <div style={analyticsStyles.placeholder}>{error}</div>;
  }

  return (
    <div style={analyticsStyles.dashboardContainer}>
      <h2 style={analyticsStyles.header}>User Analytics Overview</h2>
      <div style={analyticsStyles.chartContainer}>
        <Line data={getChartData()} options={options} />
      </div>
    </div>
  );
};