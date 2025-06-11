// PaymentUpdate.jsx
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useUpdatePayment from '../../hooks/payment/useUpdatePayment'

const useQuery = () => new URLSearchParams(useLocation().search)

export default function PaymentUpdate() {
  const navigate = useNavigate()
  const currency = useQuery().get('code')
  const { updatingPayment, updatePayment, errorPaymentUpdate } = useUpdatePayment()

  const [form, setForm] = useState({
    accountName: '',
    accountNumber: '',
    bankName: ''
  })
  const [qrImage, setQrImage] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => setQrImage(e.target.files[0])

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('currency', currency)
    formData.append('accountName', form.accountName)
    formData.append('accountNumber', form.accountNumber)
    formData.append('bankName', form.bankName)
    if (qrImage) formData.append('qrImageUrl', qrImage)

    const success = await updatePayment(formData, false)
    if (success) navigate('/admin')
  }

  return (
    <div className="flex items-center justify-center h-[100vh] bg-orange-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-center">Payment Details for {currency}</h2>

        <div>
          <h3 className="text-md font-medium mb-2">Payment Details</h3>

          <input type="text" name="accountName" value={form.accountName} onChange={handleChange} placeholder="Account Name" className="w-full border p-2 rounded mb-3" required />
          <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} placeholder="Account Number" className="w-full border p-2 rounded mb-3" required />
          <input type="text" name="bankName" value={form.bankName} onChange={handleChange} placeholder="Bank Name" className="w-full border p-2 rounded mb-3" required />
          <input type="file" name="qrImageUrl" onChange={handleFileChange} accept="image/*" className="w-full border p-2 rounded mb-3" />
        </div>

        <button type="submit" disabled={updatingPayment} className="w-full py-2 bg-blue-600 text-white rounded hover:opacity-90 mb-2">
          {updatingPayment ? 'Saving…' : 'Save'}
        </button>

        <button type="button" onClick={() => navigate('/admin/update-rates')} className="w-full py-2 bg-gray-500 text-white rounded hover:opacity-90">
          Back
        </button>

        {errorPaymentUpdate && <p className="text-red-600 text-sm mt-2">{errorPaymentUpdate}</p>}
      </form>
    </div>
  )
}
