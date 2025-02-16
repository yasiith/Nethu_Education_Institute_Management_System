import AdminNav from '@components/Admin/AdminNav'
import AllClasses from '@components/Admin/payments/AllClasses'
import Footer from '@components/footer'
import React from 'react'

const page = () => {
  return (
    <div>
        <AdminNav />
        <AllClasses />
        <Footer />
    </div>
  )
}

export default page