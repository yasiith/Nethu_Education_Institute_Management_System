'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const StudentPaymentDetails = () => {
    const searchParams = useSearchParams();
    const classId = searchParams.get('classid');
    const studentId = searchParams.get('studentid');

    const [paymentDetails, setPaymentDetails] = useState([]); // Ensure initial state is an array
    const [monthlyFees, setMonthlyFees] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [year, setYear] = useState();
    const [showTransactionHistory, setShowTransactionHistory] = useState(false); // State to manage visibility
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        if (!classId || !studentId) return;

        const fetchPaymentDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/payments/${classId}/${studentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch payment details');
                }
                const data = await response.json();
                // Ensure data is an array, even if the API returns null or an object
                setPaymentDetails(Array.isArray(data) ? data : []);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/classes/${classId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch class details');
                }
                const data = await response.json();
                setYear(data.year);
                setMonthlyFees(data.monthlyFees || {});
            } catch (error) {
                console.error('Error fetching class details:', error.message);
            }
        };

        const fetchStudentName = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/name/${studentId}`);
                if (response.ok) {
                    const data = await response.json();
                    setStudentName(data.name || '');
                }
            } catch (error) {
                console.error('Error fetching student name:', error);
            }
        };

        fetchPaymentDetails();
        fetchClassDetails();
        fetchStudentName();
    }, [classId, studentId]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();

    const getPaymentStatus = (month) => {
        // Ensure paymentDetails is an array before calling .find
        if (!Array.isArray(paymentDetails)) {
            return 'Not Paid';
        }
        const payment = paymentDetails.find(p => p.month === month && new Date(p.createdAt).getFullYear() === currentYear);
        return payment && payment.status === 'Completed' ? 'Paid' : 'Not Paid';
    };

    const fetchPaymentDetailsBySessionId = async (sessionId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/payment-details/${sessionId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch payment details');
            }
            const data = await response.json();
            setSelectedPayment(data);
            setIsPopupVisible(true);
        } catch (error) {
            console.error('Error fetching payment details:', error);
            setError(error.message);
        }
    };

    const handleSetAsPaid = async (month) => {
        const isConfirmed = window.confirm(`Are you sure you want to set ${month} as paid?`);
        if (!isConfirmed) return;

        try {
            const response = await fetch('http://localhost:5000/api/payments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: studentId,
                    classId: classId,
                    month: month,
                    year: year,
                    amount: monthlyFees[month] || 0,
                    status: 'Completed',
                    transactionId: 'Cash payment'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update payment status');
            }

            const newPayment = await response.json();
            console.log('New payment:', newPayment);
            window.location.reload();
        } catch (error) {
            console.error('Error setting payment as paid:', error);
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                Error: {error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Details</h1>
                <p className="text-xl text-gray-500">Manage and view payment information</p>
            </div>

            {/* Student information card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4">
                    <h2 className="text-2xl font-semibold text-white">Student Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    <div>
                        <p className="text-base font-medium text-gray-500">Student ID</p>
                        <p className="text-xl font-semibold text-gray-900">{studentId}</p>
                    </div>
                    <div>
                        <p className="text-base font-medium text-gray-500">Student Name</p>
                        <p className="text-xl font-semibold text-gray-900">{studentName || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-base font-medium text-gray-500">Class ID</p>
                        <p className="text-xl font-semibold text-gray-900">{classId}</p>
                    </div>
                    <div>
                        <p className="text-base font-medium text-gray-500">Year</p>
                        <p className="text-xl font-semibold text-gray-900">{year || 'N/A'}</p>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            {paymentDetails.length > 0 && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-6">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Transaction History</h2>
                        <button
                            onClick={() => setShowTransactionHistory(!showTransactionHistory)}
                            className="inline-flex items-center px-4 py-2 rounded-md text-base font-medium 
                                     bg-green-50 text-green-600 hover:bg-green-100 transition-colors
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            {showTransactionHistory ? 'Hide History' : 'Show History'}
                        </button>
                    </div>
                    
                    {showTransactionHistory && (
                        <div className="px-6 py-4">
                            <div className="divide-y divide-gray-200">
                                {paymentDetails.map((payment, index) => (
                                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                                        <div className="flex flex-wrap justify-between mb-2">
                                            <div className="mb-2 md:mb-0">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xl font-medium bg-blue-100 text-blue-800">
                                                    {payment.month} {payment.year}
                                                </span>
                                            </div>
                                            <div>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-lg font-medium ${
                                                    payment.status === 'Completed' || payment.status === 'Paid' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {payment.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-lg">
                                            <div>
                                                <span className="text-gray-500">Amount:</span> 
                                                <span className="ml-1 font-medium">LKR {payment.amount}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Date:</span> 
                                                <span className="ml-1 font-medium">{new Date(payment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="md:col-span-2">
                                                <span className="text-gray-500">Transaction ID:</span>
                                                {payment.transactionId !== 'Cash payment' ? (
                                                    <button
                                                        onClick={() => fetchPaymentDetailsBySessionId(payment.transactionId)}
                                                        className="ml-1 text-blue-600 hover:text-blue-800 hover:underline font-medium focus:outline-none"
                                                    >
                                                        {payment.transactionId}
                                                    </button>
                                                ) : (
                                                    <span className="ml-1 font-medium">{payment.transactionId || 'N/A'}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Monthly Payment Status */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-800">Payment Status by Month</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center text-base font-semibold text-gray-700 uppercase tracking-wider">Month</th>
                                <th scope="col" className="px-6 py-3 text-center text-base font-semibold text-gray-700 uppercase tracking-wider">Fee (LKR)</th>
                                <th scope="col" className="px-6 py-3 text-center text-base font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-center text-base font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {months.map((month, index) => {
                                const status = getPaymentStatus(month);
                                return (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-base font-medium text-gray-900">
                                            {month}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-base text-gray-900">
                                            {monthlyFees[month] ? `LKR ${monthlyFees[month]}` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                                                status === 'Paid' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-base">
                                            {status === 'Not Paid' && (
                                                <button
                                                    onClick={() => handleSetAsPaid(month)}
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent 
                                                             text-sm font-medium rounded shadow-sm text-white 
                                                             bg-green-600 hover:bg-teal-700 transition-colors
                                                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                >
                                                    Set as Paid
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
    
            {/* Popup for Payment Details */}
            {isPopupVisible && selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4">
                            <h2 className="text-2xl font-semibold text-white">Payment Details</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-base font-medium text-gray-500">Student ID</p>
                                        <p className="text-lg font-semibold">{selectedPayment.studentId}</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-gray-500">Class ID</p>
                                        <p className="text-lg font-semibold">{selectedPayment.classId}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <p className="text-base font-medium text-gray-500">Month</p>
                                        <p className="text-lg font-semibold">{selectedPayment.month}</p>
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-gray-500">Year</p>
                                        <p className="text-lg font-semibold">{selectedPayment.year}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-base font-medium text-gray-500">Amount</p>
                                    <p className="text-lg font-semibold">{selectedPayment.amount} {selectedPayment.currency}</p>
                                </div>
                                <div>
                                    <p className="text-base font-medium text-gray-500">Status</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                                        selectedPayment.status === 'Completed' || selectedPayment.status === 'Paid'
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {selectedPayment.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-base font-medium text-gray-500">Date</p>
                                    <p className="text-lg font-semibold">{new Date(selectedPayment.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-base font-medium text-gray-500">Payment Method</p>
                                    <p className="text-lg font-semibold">{selectedPayment.paymentMethod || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setIsPopupVisible(false)}
                                    className="inline-flex items-center px-4 py-2 border border-transparent 
                                             text-sm font-medium rounded-md shadow-sm text-white 
                                             bg-green-600 hover:bg-teal-700 transition-colors
                                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentPaymentDetails;