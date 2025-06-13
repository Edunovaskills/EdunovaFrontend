import React from 'react'
import { Outlet } from 'react-router-dom'
import { MainLayout } from '../MainLayout/MainLayout'

export const HomeLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
