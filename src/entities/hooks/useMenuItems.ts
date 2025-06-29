import { useMemo } from 'react'
import { getUserRole } from 'shared/data-providers'
import { type AppPathsName } from 'entities/config'

export type MenuItem = {
  label: string
  value: AppPathsName 
}

const baseMenuItems: MenuItem[] = [
  { label: 'Home', value: '/' },
  { label: 'About-Us', value: 'about' },
  { label: 'Events', value: 'events' },
  {label:'Course',value:'course'},
  {label:'Contact-Us',value:'contactus'}
  
]

const adminMenuItems: MenuItem[] = [
  { label: 'Dashboard', value: 'adminDashboard' },
  { label: 'Events', value: 'adminEvents' },
  { label: 'Courses', value: 'adminCourses' },
  { label: 'Blogs', value: 'adminBlogs' },
  { label: 'Users', value: 'adminUsers' },
  { label: 'Certificates', value: 'adminCertificates' },
  { label: 'Enquiries', value: 'adminEnquiries' },
  { label: 'Testimonials', value: 'adminTestimonials' },
]

export const useMenuItems = (): MenuItem[] => {
  const userRole = getUserRole()

  const menuItems = useMemo(() => {
    // Check if user is admin (assuming 'admin' is the role value)
    if (userRole === 'admin') {
      return adminMenuItems
    }

    // Return base menu items for all other roles or no role
    return baseMenuItems
  }, [userRole])

  return menuItems
}
