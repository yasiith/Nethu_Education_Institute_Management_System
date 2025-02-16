import AdminNav from '@components/Admin/AdminNav'
import EnrolledStudents from '@components/Admin/payments/EnrolledStudents'
import Footer from '@components/footer'
import React from 'react'

const page = () => {
  return (
    <div>
        <AdminNav />
        <EnrolledStudents />
        <Footer />
    </div>
  )
}

export default page
