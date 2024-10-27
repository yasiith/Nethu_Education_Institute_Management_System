import Footer from '@components/footer'
import Dashboard from '@components/Student/find-classes/Dashboard'
import Navbar from '@components/Student/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default page
