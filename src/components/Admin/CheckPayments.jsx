// import React, { use } from 'react';
// import useGetAllUsers from '../../hooks/users/getAllUsers.js';
// import { useNavigate } from 'react-router-dom';
// import { handleDeleteUser } from '../../hooks/users/deleteUser.js';

// function CheckPayments() {
//   const navigate = useNavigate();

//   const { userData, loading, error, setUserData } = useGetAllUsers();

//   const goBackHandler = () => {
//     navigate('/admin');
//   };

//   const deleteHandler = async (userId) => {
//     const confirmed = window.confirm("Are you sure you want to delete this payment?");
//     if (!confirmed) return;

//     const deleteUser = await handleDeleteUser(userId);
//     if (deleteUser) {
//       setUserData(prev => prev.filter(item => item._id !== userId));
//     }
//   };

//   return (
//     <div className='bg-orange-100 flex h-[100vh] justify-center items-center'>
//       <div className='max-w-7xl mx-auto rounded-lg w-full px-4'>
//         <h1 className='text-center font-bold text-2xl p-4'>💳 User Payment Info</h1>

//         {loading && <p className='text-gray-600 text-center'>Loading User Payments…</p>}
//         {error && <p className='text-red-500 text-center'>{error}</p>}
//         {!loading && !error && (!userData || userData.length === 0) && (
//           <p className='text-center text-gray-700'>No user payment data found.</p>
//         )}

//         {!loading && !error && userData && userData.length > 0 && (
//           <div className="overflow-x-auto max-h-[70vh] overflow-y-scroll rounded-lg shadow">
//             <table className='border border-separate table-auto w-full border-gray-500 bg-white rounded-lg'>
//               <thead className='bg-cyan-300 sticky top-0 z-10'>
//                 <tr>
//                   <th className='p-3 border'>No.</th>
//                   <th className='p-3 border'>From Currency</th>
//                   <th className='p-3 border'>To Currency</th>
//                   <th className='p-3 border'>Amount</th><th className='p-3 border'>Bank</th>
//                   <th className='p-3 border'>Bank QR</th>
//                   <th className='p-3 border'>Slip Image</th>
//                   <th className='p-3 border'>Receive Payment</th>
//                   <th className='p-3 border'>Payment Transfer</th> 
//                   <th className='p-3 border'>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userData.map((user, index) => (
//                   <tr key={user._id} className="odd:bg-gray-50 even:bg-white">
//                     <td className='border p-2 text-center'>{index + 1}</td>
//                     <td className='border p-2'>{user.fromCurrency || '-'}</td>
//                     <td className='border p-2'>{user.toCurrency || '-'}</td>
//                     <td className='border p-2'>{user.amount || '-'}</td>
//                     <td className='border p-2'>{user.bank ? JSON.stringify(user.bank) : '-'}</td>
//                     <td className='border p-2 break-words'>{user.bankQr || '-'}</td>
//                     <td className='border p-2 break-words'>{user.slipImage || '-'}</td>
                    
//                     <td className='border p-2 text-center'>
//                       <button
//                         onClick={() => deleteHandler(user._id)}
//                         className='bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 transition'
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>

//             </table>
//           </div>
//         )}

//         <div className='flex items-center justify-center gap-10 p-4'>
//           <button
//             className='border rounded-md p-3 bg-green-300 hover:shadow-lg hover:scale-105 transition duration-300'
//             onClick={goBackHandler}
//           >
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CheckPayments;



import React, { useState } from 'react';
import useGetAllUsers from '../../hooks/users/getAllUsers.js';
import { useNavigate } from 'react-router-dom';
import { handleDeleteUser } from '../../hooks/users/deleteUser.js';
import { errorPayment, receivedPayment, transferPayment } from '../../hooks/users/paymentStatus.js';

function CheckPayments() {
  const navigate = useNavigate();
  const { userData, loading, error, setUserData } = useGetAllUsers();

  // Local state to track payment received and transferred status per userId
  const [paymentReceivedStatus, setPaymentReceivedStatus] = useState({});
  const [paymentTransferredStatus, setPaymentTransferredStatus] = useState({});

  const goBackHandler = () => {
    navigate('/admin');
  };

  const deleteHandler = async (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this payment?");
    if (!confirmed) return;

    const deleteUser = await handleDeleteUser(userId);
    if (deleteUser) {
      setUserData(prev => prev.filter(item => item._id !== userId));
      // Remove status if user deleted
      setPaymentReceivedStatus(prev => {
        const copy = { ...prev };
        delete copy[userId];
        return copy;
      });
      setPaymentTransferredStatus(prev => {
        const copy = { ...prev };
        delete copy[userId];
        return copy;
      });
    }
  };

  // const handlePaymentReceived = (userId, value) => {
  //   setPaymentReceivedStatus(prev => ({ ...prev, [userId]: value }));
  // };

  const handlePaymentReceived = async (userId, value)=>{
    if(value==="Yes"){
      const status = await receivedPayment(userId)
      if(status){
        setPaymentReceivedStatus(prev=>({...prev, [userId]: "Yes"}))
      }
    } else if(value==="No"){
      const status = await errorPayment(userId)
      if(status){
        setPaymentReceivedStatus(prev=>({...prev, [userId]: "No"}))
      }
    }
  }

  // const handlePaymentTransferred = (userId) => {
  //   setPaymentTransferredStatus(prev => ({ ...prev, [userId]: true }));
  // };

  const handlePaymentTransferred = async (userId) =>{
    const status = await transferPayment(userId)
    if(status){
      setPaymentTransferredStatus(prev=>({...prev, [userId]: true}))
    }
  }

  return (
    <div className='bg-orange-100 flex h-[100vh] justify-center items-center'>
      <div className='max-w-7xl mx-auto rounded-lg w-full px-4'>
        <h1 className='text-center font-bold text-2xl p-4'>💳 User Payment Info</h1>

        {loading && <p className='text-gray-600 text-center'>Loading User Payments…</p>}
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {!loading && !error && (!userData || userData.length === 0) && (
          <p className='text-center text-gray-700'>No user payment data found.</p>
        )}

        {!loading && !error && userData && userData.length > 0 && (
          <div className=" overflow-x-auto max-h-[70vh] overflow-y-scroll rounded-lg shadow">
            <table className=' border border-separate table-auto w-full border-gray-500 bg-white rounded-lg'>
              <thead className='bg-cyan-300 sticky top-0 z-10'>
                <tr>
                  <th className='p-3 border'>No.</th>
                  <th className='p-3 border'>From Currency</th>
                  <th className='p-3 border'>To Currency</th>
                  <th className='p-3 border'>Amount</th>
                  <th className='p-3 border'>Bank</th>
                  <th className='p-3 border'>Bank QR</th>
                  <th className='p-3 border'>Slip Image</th>

                  <th className='p-3 border'>Payment Received</th>
                  <th className='p-3 border'>Payment Transferred</th>
                  <th className='p-3 border'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={user._id} className="odd:bg-gray-50 even:bg-white">
                    <td className='border p-2 text-center'>{index + 1}</td>
                    <td className='border p-2'>{user.fromCurrency || '-'}</td>
                    <td className='border p-2'>{user.toCurrency || '-'}</td>
                    <td className='border p-2'>{user.amount || '-'}</td>
                    <td className='border p-2'>{user.bank ? JSON.stringify(user.bank) : '-'}</td>
                    <td className='border p-2 break-words'>{user.bankQr || '-'}</td>
                    <td className='border p-2 break-words'>{user.slipImage || '-'}</td>

                    {/* Payment Received: Yes / No buttons */}
                    <td className='border p-2 text-center flex flex-col gap-3 '>
                      <button
                        onClick={() => handlePaymentReceived(user._id, 'Yes')}
                        className={`px-3 py-1 rounded ${
                          paymentReceivedStatus[user._id] === 'Yes' ? 'bg-green-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handlePaymentReceived(user._id, 'No')}
                        className={`px-3 py-1 rounded ${
                          paymentReceivedStatus[user._id] === 'No' ? 'bg-red-500 text-white' : 'bg-gray-200'
                        }`}
                      >
                        No
                      </button>
                    </td>

                    {/* Payment Transferred: Single button */}
                    <td className='border p-2 text-center'>
                      <button
                        onClick={() => handlePaymentTransferred(user._id)}
                        disabled={paymentTransferredStatus[user._id]}
                        className={`px-3 py-1 rounded ${
                          paymentTransferredStatus[user._id] ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'
                        }`}
                      >
                        {paymentTransferredStatus[user._id] ? 'Transferred' : 'Transfer'}
                      </button>
                    </td>

                    <td className='border p-2 text-center'>
                      <button
                        onClick={() => deleteHandler(user._id)}
                        className='bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 transition'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

        <div className='flex items-center justify-center gap-10 p-4'>
          <button
            className='border rounded-md p-3 bg-green-300 hover:shadow-lg hover:scale-105 transition duration-300'
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

