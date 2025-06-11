import React, { useEffect, useState } from 'react'
import buyRateFetch from '../../hooks/rates/buyRateFetch.js'
import MoneySelector from './MoneySelector.jsx'
import { useNavigate } from 'react-router-dom'
import getPayment from '../../hooks/payment/getPayment.js'
import PaymentSelector from './buttons/PaymentSelector.jsx'

function BuyMoneyChanger() {
    const navigate = useNavigate()
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState("USD")
    const [toCurrency, setToCurrency] = useState("MMK")
    const [convertAmount, setConvertAmount] = useState(null)
    const [selectedMethod, setSelectedMethod] = useState(null)
    const [showPaymentSelector, setShowPaymentSelector] = useState(false)

    const { buyRate, error, loading } = buyRateFetch(fromCurrency)
    const { bank, qrImage} = getPayment(fromCurrency)

    useEffect(() => {
        if (!buyRate[fromCurrency] || !buyRate[toCurrency]) {
            setConvertAmount("N/A")
            return
        }

        const converted = ((amount / buyRate[fromCurrency]) * buyRate[toCurrency]).toFixed(2)
        setConvertAmount(converted)
    }, [amount, fromCurrency, toCurrency, buyRate])

    const handleBackKey = () => {
        navigate('/')
    }

    const handleSendToAdmin = ()=>{
        navigate('/payment-record')
    }

    const handlePaymentSelect = (method) => {
        setSelectedMethod(method)
        setShowPaymentSelector(false)

    }

    return (
        <div className="relative flex flex-col justify-center items-center h-screen w-screen bg-orange-100 space-y-4">
            {/* White Box */}
            <div className='items-center justify-center mx-auto max-w-md bg-white rounded-md p-6 shadow-md'>
                <h2 className='text-center text-2xl font-bold mb-3 text-lime-500'>Buy Rates</h2>

                <div>
                    <label htmlFor='amount' className='text-sm text-gray-400'>Amount</label>
                    <input
                        type='number'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='border p-2 w-full rounded-md'
                    />

                    <div className='flex gap-2 mt-4'>
                        <MoneySelector
                            label={"From"}
                            selectedCurrency={fromCurrency}
                            currencies={Object.keys(buyRate).filter(c => c !== toCurrency)}
                            onChange={setFromCurrency}
                        />
                        <MoneySelector
                            label={"To"}
                            selectedCurrency={toCurrency}
                            currencies={Object.keys(buyRate).filter(c => c !== fromCurrency)}
                            onChange={setToCurrency}
                        />
                    </div>

                    <div className='text-center p-2 mt-4'>
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {convertAmount === null && <p>Please Choose One</p>}
                        {!loading && !error && convertAmount !== null && (
                            <p>
                                {amount} {fromCurrency} = <span className='text-blue-400'>{convertAmount} {toCurrency}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons under the box */}
            <div className='flex gap-4'>
                <button onClick={handleBackKey} className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">Back</button>
                <PaymentSelector
                    open={showPaymentSelector}
                    onOpen={() => setShowPaymentSelector(true)}
                    onClose={() => setShowPaymentSelector(false)}
                    onPaymentSelect={handlePaymentSelect}
                />

            </div>

            {/* Show QR or Bank info based on selected method */}
            {selectedMethod === "QR" && qrImage && (
                <div className="mt-6 text-center">
                    <p className='font-medium'>Scan this QR to pay:</p>
                    <img src={qrImage} alt="QR Code" className="mt-2 w-48 h-48 mx-auto border rounded-md" />
                </div>
            )
            }

            {selectedMethod === "Bank" && bank && (
                <div className="mt-6 text-center bg-white p-4 rounded-md shadow-md">
                    <h3 className='font-semibold text-lg text-green-600'>Bank Transfer Info</h3>
                    <p><strong>Bank:</strong> {bank.bankName}</p>
                    <p><strong>Account Name:</strong> {bank.accountName}</p>
                    <p><strong>Account Number:</strong> {bank.accountNumber}</p>
                </div>
            )}

            {selectedMethod && (
                <div className="flex gap-4 mt-4">
                    {selectedMethod && (
                        <button
                            onClick={() => setShowPaymentSelector(true)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Change Payment Method
                        </button>
                    )}

                    <button
                        onClick={() => handleSendToAdmin()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Send Slip to Admin
                    </button>
                </div>
            )}

        </div>
    )
}

export default BuyMoneyChanger



