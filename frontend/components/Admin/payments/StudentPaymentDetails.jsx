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

        fetchPaymentDetails();
        fetchClassDetails();
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
            <div className="border rounded-lg p-4 bg-gray-50">
                <p><strong>Student ID:</strong> {studentId}</p>
                <p><strong>Class ID:</strong> {classId}</p>
                {paymentDetails.length > 0 && (
                    <>
                        <button
                            onClick={() => setShowTransactionHistory(!showTransactionHistory)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                        >
                            {showTransactionHistory ? 'Hide Transaction History' : 'Show Transaction History'}
                        </button>
                        {showTransactionHistory && (
                            <>
                                <h2 className="text-xl font-semibold mt-4">Transaction History</h2>
                                <ul className="mt-2">
                                    {paymentDetails.map((payment, index) => (
                                        <li key={index} className="border-b py-2">
                                            <p><strong>Month:</strong> {payment.month} {payment.year}</p>
                                            <p><strong>Amount Paid:</strong> ${payment.amount}</p>
                                            <p><strong>Status:</strong> <span className={payment.status === 'Paid' ? 'text-green-500' : 'text-red-500'}>{payment.status}</span></p>
                                            <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
                                            <p>
                                                <strong>Session ID:</strong> 
                                                {payment.transactionId !== 'Cash payment' ? (
                                                    <span
                                                        className="text-blue-500 cursor-pointer underline"
                                                        onClick={() => fetchPaymentDetailsBySessionId(payment.transactionId)}
                                                    >
                                                        {payment.transactionId}
                                                    </span>
                                                ) : (
                                                    <span> {payment.transactionId || 'N/A'}</span>
                                                )}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </>
                )}
                <h2 className="text-xl font-semibold mt-4">Payment Status by Month</h2>
                <table className="mt-2 w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Month</th>
                            <th className="border border-gray-300 p-2">Fee (LKR)</th>
                            <th className="border border-gray-300 p-2">Status</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {months.map((month, index) => {
                            const status = getPaymentStatus(month);
                            return (
                                <tr key={index} className="border border-gray-300">
                                    <td className="border border-gray-300 p-2">{month}</td>
                                    <td className="border border-gray-300 p-2">{monthlyFees[month] || 'N/A'}</td>
                                    <td className={`border border-gray-300 p-2 ${status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{status}</td>
                                    <td className="border border-gray-300 p-2">
                                        {status === 'Not Paid' && (
                                            <button
                                                onClick={() => handleSetAsPaid(month)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded"
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
    
            {/* Popup for Payment Details */}
            {isPopupVisible && selectedPayment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        <p><strong>Student ID:</strong> {selectedPayment.studentId}</p>
                        <p><strong>Class ID:</strong> {selectedPayment.classId}</p>
                        <p><strong>Month:</strong> {selectedPayment.month}</p>
                        <p><strong>Year:</strong> {selectedPayment.year}</p>
                        <p><strong>Amount:</strong> {selectedPayment.amount} {selectedPayment.currency}</p>
                        <p><strong>Status:</strong> {selectedPayment.status}</p>
                        <p><strong>Date:</strong> {new Date(selectedPayment.createdAt).toLocaleDateString()}</p>
                        <p><strong>Payment Method:</strong> {selectedPayment.paymentMethod}</p>
                        <button
                            onClick={() => setIsPopupVisible(false)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentPaymentDetails;