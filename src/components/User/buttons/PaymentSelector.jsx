import React from 'react'

function PaymentSelector({ open, onOpen, onClose, onPaymentSelect, label = "Exchange" }) {
    const handleSelection = (method) => {
        if (onPaymentSelect) {
            onPaymentSelect(method)
        }
    }

    return (
        <>
            <button 
                onClick={onOpen} 
                className='bg-green-500 px-6 py-2 text-white rounded-md hover:bg-green-600'
            >
                {label}
            </button>

            {open && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-10 z-50">
                    <div className="bg-lime-200 p-8 rounded-lg shadow-lg text-center space-y-4">
                    <h3 className="text-lg font-semibold">Choose Payment Method</h3>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    handleSelection("QR")
                                    onClose()
                                }}
                                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                            >
                                QR
                            </button>
                            <button
                                onClick={() => {
                                    handleSelection("Bank")
                                    onClose()
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Bank
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="mt-2 text-sm text-red-400 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default PaymentSelector
