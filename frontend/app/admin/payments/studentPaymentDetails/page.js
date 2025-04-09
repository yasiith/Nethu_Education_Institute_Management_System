import AdminNav from '@components/Admin/AdminNav'
import StudentPaymentDetails from '@components/Admin/payments/StudentPaymentDetails'
import Footer from '@components/footer'
import React from 'react'

const page = () => {
  return (
    <div>
        <AdminNav />
        <StudentPaymentDetails />
        <Footer />
    </div>
  )
}

export default page