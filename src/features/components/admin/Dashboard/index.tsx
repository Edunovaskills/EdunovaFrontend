import React, { useState, useEffect } from 'react'
import { dashboardStyles } from './styles.component'
import { fetchCourses } from '../AddCourse/mock/mockCourses'
import { fetchUsers } from '../Users/users.api'
import { DashboardStats } from './types'
import {
  useAllCoursesForAdminQuery,
  useAllEventsForAdminQuery,
} from 'entities/query'

// Fixed AnimatedCounter component - moved outside and properly typed
interface AnimatedCounterProps {
  endValue: number
  duration?: number
  suffix?: string
  prefix?: string
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  endValue,
  duration = 2000,
  suffix = '',
  prefix = '',
}) => {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const value = Math.floor(easedProgress * endValue)

      setCurrentValue(value)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [endValue, duration])

  return (
    <span>
      {prefix}
      {currentValue.toLocaleString()}
      {suffix}
    </span>
  )
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 24,
    totalCourses: 0,
    activeUsers: 0,
    revenue: '0',
  })
  const [loading, setLoading] = useState(true)

  const recentActivities = [
    { action: 'New user registered', time: '2 minutes ago', type: 'user' },
    {
      action: 'Event "React Workshop" created',
      time: '1 hour ago',
      type: 'event',
    },
    {
      action: 'Course "Python Basics" updated',
      time: '3 hours ago',
      type: 'course',
    },
  ]

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch courses and users data
        const [coursesResponse, usersData] = await Promise.all([
          fetchCourses(100), // Fetch all courses to get total count
          fetchUsers(),
        ])

        setStats((prevStats) => ({
          ...prevStats,
          totalCourses: coursesResponse.courses.length,
          activeUsers: usersData.length,
        }))
      } catch (error) {
        console.error('Error loading dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  // Fixed statsDisplay to handle numeric values properly for AnimatedCounter
  const { data: eventsData } = useAllEventsForAdminQuery()
  const { data: coursesData } = useAllCoursesForAdminQuery()

  const statsDisplay = [
    {
      title: 'Total Events',
      value: eventsData?.total || 0,
      icon: '📅',
      color: '#667eea',
      isLoading: false,
    },
    {
      title: 'Total Courses',
      value: coursesData?.total || 0,
      icon: '📚',
      color: '#f093fb',
      isLoading: loading,
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      icon: '👥',
      color: '#4facfe',
      isLoading: loading,
    },
  ]

  return (
    <div style={dashboardStyles.container}>
      <h2 style={dashboardStyles.title as any}>Dashboard Overview</h2>
      <div style={dashboardStyles.statsGrid}>
        {statsDisplay.map((stat, index) => (
          <div
            key={index}
            style={{
              ...dashboardStyles.statCard,
              borderLeft: `4px solid ${stat.color}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            <div style={dashboardStyles.statIcon}>{stat.icon}</div>
            <div>
              <h3 style={dashboardStyles.statValue}>
                {stat.isLoading ? (
                  '...'
                ) : (
                  <AnimatedCounter
                    endValue={stat.value}
                    duration={2000 + index * 200}
                    prefix={''}
                  />
                )}
              </h3>
              <p style={dashboardStyles.statTitle}>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={dashboardStyles.activitySection}>
        <h3 style={dashboardStyles.sectionTitle}>Recent Activities</h3>
        <div style={dashboardStyles.activityList}>
          {recentActivities.map((activity, index) => (
            <div key={index} style={dashboardStyles.activityItem}>
              <div style={dashboardStyles.activityIcon}>
                {activity.type === 'user' && '👤'}
                {activity.type === 'event' && '📅'}
                {activity.type === 'course' && '📚'}
              </div>
              <div style={dashboardStyles.activityContent}>
                <p style={dashboardStyles.activityAction}>{activity.action}</p>
                <span style={dashboardStyles.activityTime}>
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
