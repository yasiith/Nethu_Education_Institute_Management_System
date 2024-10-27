import Footer from '@components/footer'
import Dashboard from '@components/Student/Dashboard'
import Navbar from '@components/Student/Navbar'
import React from 'react'

const studentDashboard = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default studentDashboard
