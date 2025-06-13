import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from 'entities/component'

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
