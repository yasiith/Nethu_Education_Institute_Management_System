'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ClientOnly from '../../../../components/ClientOnly';
import AdminNav from '@components/Admin/AdminNav'
import Footer from '@components/footer'

// Loading component for Suspense
const Loading = () => <div className="p-4 text-center">Loading student payment details...</div>;

// Sample payment data
const paymentDetailsSample = [
  { id: 1, month: 'January', amount: 2500, date: '2023-01-15', status: 'Paid' },
  { id: 1, month: 'February', amount: 2500, date: '2023-02-10', status: 'Paid' },
  { id: 1, month: 'March', amount: 2500, date: '2023-03-12', status: 'Paid' },
  { id: 2, month: 'January', amount: 3000, date: '2023-01-10', status: 'Paid' },
  { id: 2, month: 'February', amount: 3000, date: '2023-02-08', status: 'Paid' },
];

// Student sample data
const studentsSample = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '234-567-8901' },
];

const StudentPaymentDetailsContent = () => {
  const searchParams = useSearchParams();
  const studentId = searchParams.get('studentId');
  const [studentDetails, setStudentDetails] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    if (studentId) {
      // Find student details from sample data
      const student = studentsSample.find(s => s.id === parseInt(studentId));
      if (student) {
        setStudentDetails(student);
      }

      // Filter payment history for this student
      const payments = paymentDetailsSample.filter(p => p.id === parseInt(studentId));
      setPaymentHistory(payments);
    }
  }, [studentId]);

  if (!studentDetails) {
    return <div>Loading student details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Payment Details</h1>
      
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Student Information</h2>
        <p><strong>Name:</strong> {studentDetails.name}</p>
        <p><strong>Email:</strong> {studentDetails.email}</p>
        <p><strong>Phone:</strong> {studentDetails.phone}</p>
      </div>
      
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Month</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{payment.month}</td>
                  <td className="py-2 px-4 border-b">{payment.amount}</td>
                  <td className="py-2 px-4 border-b">{payment.date}</td>
                  <td className="py-2 px-4 border-b">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StudentPaymentDetailsPage = () => {
  return (
    <div>
      <AdminNav />
      <Suspense fallback={<Loading />}>
        <ClientOnly>
          <StudentPaymentDetailsContent />
        </ClientOnly>
      </Suspense>
      <Footer />
    </div>
  );
};

export default StudentPaymentDetailsPage;