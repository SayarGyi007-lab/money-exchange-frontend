import React from 'react'
import { useLocation } from 'react-router-dom'
import useGetUser from '../../../hooks/users/getUser.js'

function Pending() {
  const location = useLocation()
  const userId = location.state?.userId // get userId from navigation state
  console.log("userId from location:", userId)
  const { userData, loading, error } = useGetUser(userId)

  return (
    <div className="bg-orange-50 min-h-screen flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-green-600 text-center mb-8">
          Pending Payment
        </h1>

        {loading && (
          <div className="bg-white shadow-md rounded-2xl p-6 text-center text-gray-600 border border-orange-200">
            Loading User Payments…
          </div>
        )}

        {error && (
          <div className="bg-white shadow-md rounded-2xl p-6 text-center text-red-500 border border-orange-200">
            {error}
          </div>
        )}

        {!loading && !error && !userData && (
          <div className="bg-white shadow-md rounded-2xl p-6 text-center text-gray-700 border border-orange-200">
            No user payment data found.
          </div>
        )}

        {userData && (
          <div className="bg-white shadow-lg rounded-2xl p-8 border border-orange-300">
            <h2 className="text-2xl font-semibold mb-6 text-green-600 text-center">
              User Payment Details
            </h2>
            <div className="space-y-4 text-gray-700">
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
    </div>
  )
}

export default Pending
