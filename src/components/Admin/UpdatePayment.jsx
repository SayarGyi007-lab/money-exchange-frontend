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
    setForm(prev => ({ ...prev, [name]: value.toUpperCase() }))
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
    <div className="min-h-screen bg-orange-200 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-6 px-4">
          <h1 className="text-3xl font-bold text-center">💳 Update Payment – {currency}</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="accountName">Account Name</label>
            <input
              id="accountName"
              name="accountName"
              value={form.accountName}
              onChange={handleChange}
              placeholder="Enter account name"
              className="w-full border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="accountNumber">Account Number</label>
            <input
              id="accountNumber"
              type="number"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              placeholder="Enter account number"
              className="w-full border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
              required
              onWheel={e => e.currentTarget.blur()}
              onKeyDown={e => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault()
              }}
              style={{ MozAppearance: 'textfield' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="bankName">Bank Name</label>
            <input
              id="bankName"
              name="bankName"
              value={form.bankName}
              onChange={handleChange}
              placeholder="Enter bank name"
              className="w-full border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="qrImageUrl">QR Code Image</label>
            <input
              id="qrImageUrl"
              type="file"
              name="qrImageUrl"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={updatingPayment}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 disabled:opacity-70"
            >
              {updatingPayment ? 'Saving…' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/update-rates')}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
            >
              Back
            </button>
          </div>

          {errorPaymentUpdate && <p className="text-red-600 text-sm mt-2 text-center">{errorPaymentUpdate}</p>}
        </form>
      </div>
    </div>
  )
}
