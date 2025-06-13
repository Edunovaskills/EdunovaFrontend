import React from 'react'

import { Outlet } from 'react-router-dom'
import { MainLayout } from '../MainLayout/MainLayout'

export const AboutUsLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
