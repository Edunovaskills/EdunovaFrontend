import React from 'react'

import { Outlet } from 'react-router-dom'
import { MainLayout } from '../MainLayout/MainLayout'

export const ServiceLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
