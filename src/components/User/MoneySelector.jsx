import React from 'react'

function MoneySelector({ label, selectedCurrency, currencies, onChange }) {
     return (
          <div className='w-full'>
               <label className='font-sm text-gray-400' >{label}</label>
               <select className='border flex w-full p-2'
                    value={selectedCurrency}
                    onChange={(e) => onChange(e.target.value)}

               >
                    {currencies.map((currency, index) => {
                         return <option value={currency} key={index}>{currency}</option>
                    })}

               </select>
          </div>
     )
}

export default MoneySelector