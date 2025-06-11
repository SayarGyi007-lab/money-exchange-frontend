import React from 'react'
import useGetPayment from '../../hooks/payment/getPayment'

function CurrencyRow({ data, onDelete }) {
  const { bank, qrImage, errorPayment, loading } = useGetPayment(data.currency)

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${data.currency}?`)) {
      onDelete(data.currency)
    }
  }

  return (
    <tr className='text-center'>
      <td className='border p-2'>{data.currency}</td>
      <td className='border p-2 text-lime-500'>
        {(1 / data.buyRate).toFixed(2)} <span className='text-black'>MMK</span>
      </td>
      <td className='border p-2 text-amber-500'>
        {(1 / data.sellRate).toFixed(2)} <span className='text-black'>MMK</span>
      </td>
      <td className='border p-2'>{data.updatedAt}</td>

      <td className='border p-2 text-left'>
        {loading ? (
          "Loading…"
        ) : errorPayment ? (
          "Error"
        ) : bank?.bankName ? (
          <div>
            <div><strong>Bank:</strong> {bank.bankName}</div>
            <div><strong>Account No:</strong> {bank.accountNumber}</div>
            <div><strong>Account Name:</strong> {bank.accountName}</div>
          </div>
        ) : (
          "No Bank Info"
        )}
      </td>

      <td className='border p-2 break-all'>
        {loading
          ? "Loading…"
          : errorPayment
          ? "Error"
          : qrImage
          ? qrImage
          : "No Image"}
      </td>

      {/* Delete Button */}
      <td className='border p-2'>
        <button
          onClick={handleDelete}
          className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default CurrencyRow
