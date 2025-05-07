import AdminNav from '@components/Admin/AdminNav'
import AllClasses from '@components/Admin/payments/AllClasses'
import Footer from '@components/footer'
import React from 'react'

const page = () => {
  return (
    <div 
      className="min-h-screen relative"
    >
      <div className="relative z-10">
        <AdminNav />
        <AllClasses />
        <Footer />
      </div>
    </div>
  )
}

export default page