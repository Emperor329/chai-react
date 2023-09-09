import React from 'react'
import { Header } from './components'
import { Footer } from './components'
import { Outlet } from 'react-router-dom'

function Layout() {// we can do this in App.js also
  return (
    <>
        <Header/>
            <Outlet />
        <Footer/>
    </>
  )
}

export default Layout
