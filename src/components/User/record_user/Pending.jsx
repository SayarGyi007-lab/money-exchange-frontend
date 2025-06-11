import React from 'react'
import { useLocation } from 'react-router-dom'
import useGetUser from '../../../hooks/users/getUser.js'

function Pending() {
  const location = useLocation()
  const userId = location.state?.userId // get userId from navigation state
  console.log("userId from location:", userId)
  const { userData, loading, error } = useGetUser(userId)

  return (
    <div className="bg-orange-100 min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {loading && (
        <p className="text-gray-600 text-center">Loading User Payments…</p>
      )}
      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}
      {!loading && !error && !userData && (
        <p className="text-center text-gray-700">No user payment data found.</p>
      )}
      {userData && (
        <div className="max-w-xl w-full bg-white rounded-2xl p-6 shadow-md border border-orange-300">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600 text-center">User Payment Details</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>Bank Owner Name:</strong> {userData.bank.bankOwnerName}</p>
            <p><strong>Account Number:</strong> {userData.bank.accountNumber}</p>
            <p><strong>Bank Name:</strong> {userData.bank.bankName}</p>
            <p><strong>From Currency:</strong> {userData.fromCurrency.toUpperCase()}</p>
            <p><strong>To Currency:</strong> {userData.toCurrency.toUpperCase()}</p>
            <p><strong>Amount:</strong> {userData.amount.toLocaleString()}</p>
            <p>
              <strong>Status:</strong>{' '}
              {userData.paymentStatus === 'received'
                ? '✅ Payment has been received.'
                : userData.paymentStatus === 'not-received'
                  ? '🚫 Payment has not been received.'
                : userData.paymentStatus === 'transferred'
                    ? '🔄 Payment has been transferred.'
                : userData.paymentStatus}
            </p>

          </div>
        </div>
      )}
    </div>
  )
}

export default Pending
