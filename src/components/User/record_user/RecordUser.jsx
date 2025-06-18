


import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'  // import useNavigate
import useCreateUser from '../../../hooks/users/createUser'

function RecordUser() {
  const { register, userData, error, loading } = useCreateUser()
  const navigate = useNavigate() // initialize navigate

  const [formFields, setFromFields] = useState({
    bankOwnerName: "",
    accountNumber: "",
    bankName: "",
    fromCurrency: "",
    toCurrency: "",
    amount: "",
  })
  const [paymentSlip, setPaymentSlip] = useState(null)
  const [bankQr, setBankQr] = useState(null)

  
  useEffect(() => {
    if (userData ) {
      navigate('/pending', { state: { userId: userData._id || userData.id } })  // <-- pass userId here
    }
  }, [userData, navigate])

  const handleChange = (e) => {
    setFromFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.name === "bankQr") {
      setBankQr(e.target.files[0])
    } else if (e.target.name === "slipImage") {
      setPaymentSlip(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!paymentSlip) {
        alert("Please upload a payment slip before submitting.")
        return
      }

    const data = new FormData()
    Object.entries(formFields).forEach(([key, value]) => {
      data.append(key, value)
    })

    if (bankQr) data.append("bankQr", bankQr)
    data.append("slipImage", paymentSlip)

    await register(data)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-5"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Register User</h2>
      <p className='text-red-500 text-md text-center'> Please fill the bank to transfer money</p>
      {[
        { name: "bankOwnerName", label: "Bank Owner Name" },
        { name: "accountNumber", label: "Account Number", type: "number" },
        { name: "bankName", label: "Bank Name" },
        { name: "fromCurrency", label: "From Currency" },
        { name: "toCurrency", label: "To Currency" },
        { name: "amount", label: "Amount (To Currency)", type: "number" },
      ].map(({ name, label, type = "text" }) => (
        <div key={name}>
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
          <input
            id={name}
            type={type}
            name={name}
            value={formFields[name]}
            onChange={handleChange}
            placeholder={label}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required

            {...(type === "number"
              ? {
                  onWheel: e => e.currentTarget.blur(),
                  onKeyDown: e => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                      e.preventDefault();
                    }
                  },
                  style: { MozAppearance: "textfield" }
                }
              : {}
            )}
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="slipImage"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Slip Image
        </label>
        <input
          id="slipImage"
          type="file"
          name="slipImage"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-md file:px-4 file:py-2 file:border-0 file:bg-blue-50 file:text-blue-700"
        />
      </div>

      <div>
        <label
          htmlFor="bankQr"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Bank QR
        </label>
        <input
          id="bankQr"
          type="file"
          name="bankQr"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-md file:px-4 file:py-2 file:border-0 file:bg-blue-50 file:text-blue-700"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {error && (
        <p className="text-yellow-600 text-center">{error.message || String(error)}</p>
      )}
    </form>
  )
}

export default RecordUser
