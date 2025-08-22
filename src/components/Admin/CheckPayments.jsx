import React, { useState } from 'react';
import useGetAllUsers from '../../hooks/users/getAllUsers.js';
import { useNavigate } from 'react-router-dom';
import { handleDeleteUser } from '../../hooks/users/deleteUser.js';
import { errorPayment, receivedPayment, transferPayment } from '../../hooks/users/paymentStatus.js';

function CheckPayments() {
  const navigate = useNavigate();
  const { userData, loading, error, setUserData } = useGetAllUsers();

  const [paymentReceivedStatus, setPaymentReceivedStatus] = useState({});
  const [paymentTransferredStatus, setPaymentTransferredStatus] = useState({});

  const goBackHandler = () => navigate('/admin');

  const deleteHandler = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this payment?");
    if (!confirmed) return;

    const deleteUser = await handleDeleteUser(userId);
    if (deleteUser) {
      setUserData(prev => prev.filter(item => item._id !== userId));
      setPaymentReceivedStatus(prev => { const copy = { ...prev }; delete copy[userId]; return copy; });
      setPaymentTransferredStatus(prev => { const copy = { ...prev }; delete copy[userId]; return copy; });
    }
  };

  const handlePaymentReceived = async (userId, value) => {
    if (value === "Yes") {
      const status = await receivedPayment(userId);
      if (status) setPaymentReceivedStatus(prev => ({ ...prev, [userId]: "Yes" }));
    } else if (value === "No") {
      const status = await errorPayment(userId);
      if (status) setPaymentReceivedStatus(prev => ({ ...prev, [userId]: "No" }));
    }
  };

  const handlePaymentTransferred = async (userId) => {
    const status = await transferPayment(userId);
    if (status) setPaymentTransferredStatus(prev => ({ ...prev, [userId]: true }));
  };

  return (
    <div className="min-h-screen bg-orange-200 flex flex-col items-center p-4">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-6 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">💳 User Payment Info</h1>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[70vh] p-4">
          {loading && <p className="text-gray-600 text-center py-6 animate-pulse">Loading User Payments…</p>}
          {error && <p className="text-red-500 text-center py-6">{error}</p>}
          {!loading && !error && (!userData || userData.length === 0) && (
            <p className="text-center text-gray-700">No user payment data found.</p>
          )}

          {!loading && !error && userData && userData.length > 0 && (
            <table className="table-auto w-full border-collapse text-sm md:text-base">
              <thead className="sticky top-0 bg-cyan-300 text-gray-800 shadow-md">
                <tr>
                  {["No.", "From Currency", "To Currency", "Amount", "Bank", "Bank QR", "Slip Image", "Payment Received", "Payment Transferred", "Delete"].map(head => (
                    <th key={head} className="px-3 py-3 border text-left">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={user._id} className="odd:bg-gray-50 even:bg-white">
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">{user.fromCurrency || '-'}</td>
                    <td className="border p-2">{user.toCurrency || '-'}</td>
                    <td className="border p-2">{user.amount || '-'}</td>
                    <td className="border p-2">{user.bank ? JSON.stringify(user.bank) : '-'}</td>
                    <td className="border p-2 break-words">{user.bankQr || '-'}</td>
                    <td className="border p-2 break-words">{user.slipImage || '-'}</td>

                    <td className="border p-2 text-center flex flex-col gap-2">
                      <button
                        onClick={() => handlePaymentReceived(user._id, 'Yes')}
                        className={`px-3 py-1 rounded ${paymentReceivedStatus[user._id] === 'Yes' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                      >Yes</button>
                      <button
                        onClick={() => handlePaymentReceived(user._id, 'No')}
                        className={`px-3 py-1 rounded ${paymentReceivedStatus[user._id] === 'No' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                      >No</button>
                    </td>

                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handlePaymentTransferred(user._id)}
                        disabled={paymentTransferredStatus[user._id]}
                        className={`px-3 py-1 rounded ${paymentTransferredStatus[user._id] ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                      >
                        {paymentTransferredStatus[user._id] ? 'Transferred' : 'Transfer'}
                      </button>
                    </td>

                    <td className="border p-2 text-center">
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center p-6 bg-orange-50">
          <button
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
            onClick={goBackHandler}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckPayments;
