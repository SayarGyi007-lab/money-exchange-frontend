


import React from 'react'
import getAllRateFetch from '../../hooks/rates/getAllRatesFetch'
import { useNavigate } from 'react-router-dom'
import CurrencyRow from './CurrencyRow' // We'll create this component next
import { handleDeleteCurrency } from '../../hooks/rates/deleteCurrency'

function HomePage() {
  const navigate = useNavigate()
  const { loading, error, rate, setRate } = getAllRateFetch()

  const UpdateRatesHandler = () => {
    navigate("/admin/update-rates")
  }

  const CheckPaymentHandler = () => {
    navigate("/admin/check-payments")
  }

  const handleDelete= async(currency)=>{
    const success = await handleDeleteCurrency(currency)
    if(success){
      setRate(prev => prev.filter(item => item.currency !== currency))
    }
  }

  return (
    <div className='bg-orange-100 flex h-[100vh] justify-center items-center'>
      <div className='max-w-7xl mx-auto rounded-lg'>
        <h1 className='text-center font-bold text-2xl p-4'>💱 Exchange Rates to MMK</h1>

        {loading && <p className='text-gray-600 text-center'>Loading Exchange Rates…</p>}
        {error && <p className='text-red-500 text-center'>{error}</p>}

        <div className="overflow-x-auto max-h-[70vh] overflow-y-scroll rounded-lg shadow">
        {!loading && !error && (
          <table className='border border-separate table-auto w-full border-gray-500 bg-white rounded-lg'>
            <thead className='bg-cyan-300 sticky top-0 z-10'>
              <tr>
                <th className='p-3 border'>Currency</th>
                <th className='p-3 border'>Buy Rate</th>
                <th className='p-3 border'>Sell Rate</th>
                <th className='p-3 border'>Updated At</th>
                <th className='p-3 border'>Bank</th>
                <th className='p-3 border'>QR</th>
                <th className='p-3 border'>Delete Currency</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(rate) && rate
                .filter(data => data.currency )
                .map(data => (
                  <CurrencyRow key={data._id} data={data} onDelete={handleDelete} />
                ))
              }
            </tbody>
          </table>
        )
        }
        </div>

        <div className='flex items-center justify-center gap-10 p-4'>
          <button
            className='border rounded-md p-3 bg-green-300 hover:shadow-lg hover:scale-105 transition duration-300'
            onClick={UpdateRatesHandler}
          >
            Update Rates
          </button>

          <button
            className='border rounded-md p-3 bg-green-300 hover:shadow-lg hover:scale-105 transition duration-300'
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
