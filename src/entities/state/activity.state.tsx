import React, { createContext, useContext, useState } from 'react'

export interface Activity {
  type: 'event' | 'course' | 'user' | string
  action: string
  time: string // ISO string
}

interface ActivityContextType {
  activities: Activity[]
  addActivity: (activity: Activity) => void
}

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
)

export const useActivity = () => {
  const ctx = useContext(ActivityContext)
  if (!ctx) throw new Error('useActivity must be used within ActivityProvider')
  return ctx
}

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activities, setActivities] = useState<Activity[]>([])

  const addActivity = (activity: Activity) => {
    setActivities((prev) => [activity, ...prev].slice(0, 10)) // keep last 10
  }

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  )
}
