
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
    setForm({ ...form, [field]: field === 'currency' ? e.target.value.toUpperCase() : e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const buy = parseFloat(form.buyRate)
    const sell = parseFloat(form.sellRate)

    if (!form.currency.trim() || buy <= 0 || sell <= 0) return alert('Invalid input.')

    let newRates = rate.filter(r => r.currency !== form.currency)
    newRates.push({ currency: form.currency, buyRate: buy, sellRate: sell })

    const success = await updateRates(newRates)
    if (success) navigate(`/admin/update-payment?code=${form.currency}`)
  }

  return (
    <div className="flex items-center justify-center h-[100vh] bg-orange-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-center">Edit/Add Currency</h2>

        <div>
          <h3 className="text-md font-medium mb-2">Currency Rates</h3>

          <label className="block text-sm mb-1" htmlFor="currency">Currency Code</label>
          <input id="currency" value={form.currency} onChange={onChange('currency')} placeholder="e.g. USD" className="w-full border p-2 rounded mb-3" required />

          <label className="block text-sm mb-1" htmlFor="buyRate">Buy Rate</label>
          <input id="buyRate" type="number" step="0.0001" value={form.buyRate} onChange={onChange('buyRate')} placeholder="Enter buy rate" className="w-full border p-2 rounded mb-3" required />

          <label className="block text-sm mb-1" htmlFor="sellRate">Sell Rate</label>
          <input id="sellRate" type="number" step="0.0001" value={form.sellRate} onChange={onChange('sellRate')} placeholder="Enter sell rate" className="w-full border p-2 rounded mb-3" required />
        </div>

        <button type="submit" disabled={updating} className="w-full py-2 bg-blue-600 text-white rounded hover:opacity-90 mb-2">
          {updating ? 'Saving…' : 'Next'}
        </button>
        <button type="button" onClick={() => navigate('/admin')} className="w-full py-2 bg-gray-500 text-white rounded hover:opacity-90">
          Back
        </button>

        {saveErr && <p className="text-red-600 text-sm mt-2">{saveErr}</p>}
      </form>
    </div>
  )
}
