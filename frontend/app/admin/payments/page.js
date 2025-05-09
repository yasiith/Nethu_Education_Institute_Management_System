'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientOnly from '../../../components/ClientOnly';

// Define sample data to fix the missing reference
const sampleData = [
  { id: 1, studentName: 'John Doe', classId: 'C001', month: 'January', amount: 2500, date: '2023-01-15' },
  { id: 2, studentName: 'Jane Smith', classId: 'C002', month: 'January', amount: 3000, date: '2023-01-10' },
  { id: 3, studentName: 'Alice Johnson', classId: 'C001', month: 'February', amount: 2500, date: '2023-02-12' },
];

const PaymentsPageContent = () => {
  const [payments] = useState(sampleData);
  const router = useRouter();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Records</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Student Name</th>
              <th className="py-2 px-4 border-b">Class ID</th>
              <th className="py-2 px-4 border-b">Month</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td className="py-2 px-4 border-b">{payment.studentName}</td>
                <td className="py-2 px-4 border-b">{payment.classId}</td>
                <td className="py-2 px-4 border-b">{payment.month}</td>
                <td className="py-2 px-4 border-b">{payment.amount}</td>
                <td className="py-2 px-4 border-b">{payment.date}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => router.push(`/admin/payments/studentPaymentDetails?studentId=${payment.id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PaymentsPage = () => {
  return (
    <ClientOnly>
      <PaymentsPageContent />
    </ClientOnly>
  );
};

export default PaymentsPage;
