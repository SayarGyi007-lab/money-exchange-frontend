import React from 'react'
import getAllRateFetch from '../../hooks/rates/getAllRatesFetch'
import { useNavigate } from 'react-router-dom'
import CurrencyRow from './CurrencyRow'
import { handleDeleteCurrency } from '../../hooks/rates/deleteCurrency'

function HomePage() {
  const navigate = useNavigate()
  const { loading, error, rate, setRate } = getAllRateFetch()

  const UpdateRatesHandler = () => navigate("/admin/update-rates")
  const CheckPaymentHandler = () => navigate("/admin/check-payments")

  const handleDelete = async (currency) => {
    const success = await handleDeleteCurrency(currency)
    if (success) {
      setRate(prev => prev.filter(item => item.currency !== currency))
    }
  }

  return (
    <div className="min-h-screen bg-orange-200 flex flex-col items-center p-4">
      <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-6 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">💱 Exchange Rates to MMK</h1>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto max-h-[70vh]">
          {loading && (
            <p className="text-gray-600 text-center py-6 animate-pulse">
              Loading Exchange Rates…
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center py-6">{error}</p>
          )}
          {!loading && !error && (
            <table className="table-auto w-full text-sm md:text-base border-collapse">
              <thead className="sticky top-0 bg-cyan-300 text-gray-800 shadow-md">
                <tr>
                  {["Currency", "Buy Rate", "Sell Rate", "Updated At", "Bank", "QR", "Delete"].map((head) => (
                    <th key={head} className="px-3 py-4 border text-left">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(rate) && rate
                  .filter(data => data.currency)
                  .map(data => (
                    <CurrencyRow key={data._id} data={data} onDelete={handleDelete} />
                  ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center p-6 bg-orange-50">
          <button
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
            onClick={UpdateRatesHandler}
          >
            Update Rates
          </button>
          <button
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300"
            onClick={CheckPaymentHandler}
          >
            Check Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
