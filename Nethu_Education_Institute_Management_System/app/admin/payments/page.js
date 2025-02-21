import AdminNav from '@components/Admin/AdminNav'
import Dashboard from '@components/Admin/payments/Dashboard'
import PaymentUpdate from '@components/Admin/payments/PaymentUpdate'
import Footer from '@components/footer'
import React from 'react'

const page = () => {
  return (
    <div>
        <AdminNav />
        <h1 className="text-5xl font-bold text-left text-gray-800 mt-6 ml-6 mb-3">
            View Payments
        </h1>
        <Dashboard />
        <h1 className="text-5xl font-bold text-left text-gray-800 mt-6 ml-6 mb-6">
            Update Local Payments
        </h1>
        <PaymentUpdate />
        <Footer />
    </div>
  )
}

export default page
