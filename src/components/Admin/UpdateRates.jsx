import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsegetAllRateFetch from '../../hooks/rates/getAllRatesFetch'
import useUpdateRates from '../../hooks/rates/updateRateFetch'

export default function CurrencyUpdate() {
  const navigate = useNavigate()
  const { rate } = UsegetAllRateFetch()
  const { updateRates, updating, error: saveErr } = useUpdateRates()

  const [form, setForm] = useState({ currency: '', buyRate: '', sellRate: '' })

  const onChange = field => e => {
    setForm({
      ...form,
      [field]: field === 'currency'
        ? e.target.value.toUpperCase()
        : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const buy = parseFloat(form.buyRate)
    const sell = parseFloat(form.sellRate)

    if (!form.currency.trim() || buy <= 0 || sell <= 0) {
      return alert('Invalid input.')
    }

    let newRates = rate.filter(r => r.currency !== form.currency)
    newRates.push({ currency: form.currency, buyRate: buy, sellRate: sell })

    const success = await updateRates(newRates)
    if (success) navigate(`/admin/update-payment?code=${form.currency}`)
  }

  return (
    <div className="min-h-screen bg-orange-200 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-6 px-4">
          <h1 className="text-3xl font-bold text-center">✏️ Edit / Add Currency</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Currency Rates</h3>
            <p className="text-sm text-red-500">
              Base currency is <strong>MMK</strong>. Use this formula: <br />
              <code>(1 / MMK according to exchange rate)</code>
            </p>
            <p className="text-sm text-red-500 mt-1">
              Example: If <strong>1 USD = 5000 MMK</strong>, <br />
              then <strong>buy/sell = (1 / 5000)</strong>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="currency">Currency Code</label>
            <input
              id="currency"
              value={form.currency}
              onChange={onChange('currency')}
              placeholder="e.g. USD"
              className="w-full border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="buyRate">Buy Rate</label>
            <input
              id="buyRate"
              type="number"
              step="0.0001"
              value={form.buyRate}
              onChange={onChange('buyRate')}
              placeholder="Enter buy rate"
              className="w-full border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="sellRate">Sell Rate</label>
            <input
              id="sellRate"
              type="number"
              step="0.0001"
              value={form.sellRate}
              onChange={onChange('sellRate')}
              placeholder="Enter sell rate"
              className="w-full border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300 disabled:opacity-70"
            >
              {updating ? 'Saving…' : 'Next'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
            >
              Back
            </button>
          </div>

          {saveErr && <p className="text-red-600 text-sm mt-2 text-center">{saveErr}</p>}
        </form>
      </div>
    </div>
  )
}
