import React, { useEffect, useState } from "react";
import buyRateFetch from "../../hooks/rates/buyRateFetch.js";
import MoneySelector from "./MoneySelector.jsx";
import { useNavigate } from "react-router-dom";
import getPayment from "../../hooks/payment/getPayment.js";
import PaymentSelector from "./buttons/PaymentSelector.jsx";

function BuyMoneyChanger() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("MMK");
  const [convertAmount, setConvertAmount] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showPaymentSelector, setShowPaymentSelector] = useState(false);

  const { buyRate, error, loading } = buyRateFetch(fromCurrency);
  const { bank, qrImage } = getPayment(fromCurrency);

  useEffect(() => {
    if (!buyRate[fromCurrency] || !buyRate[toCurrency]) {
      setConvertAmount("N/A");
      return;
    }

    const converted = (
      (amount / buyRate[fromCurrency]) *
      buyRate[toCurrency]
    ).toFixed(2);
    setConvertAmount(converted);
  }, [amount, fromCurrency, toCurrency, buyRate]);

  const handleBackKey = () => {
    navigate("/");
  };

  const handleSendToAdmin = () => {
    navigate("/payment-record");
  };

  const handlePaymentSelect = (method) => {
    setSelectedMethod(method);
    setShowPaymentSelector(false);
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen w-full bg-orange-50 px-4 py-10">
      {/* White Glass Box */}
      <div className="mx-auto w-full max-w-lg bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-300">
        <h2 className="text-center text-2xl font-bold mb-6 text-lime-600">
          💵 Buy Rates
        </h2>

        <div>
          <label
            htmlFor="amount"
            className="text-sm text-gray-500 font-medium"
          >
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-3 w-full rounded-xl mt-1 focus:ring-2 focus:ring-lime-400 focus:outline-none shadow-sm"
          />

          {/* Money Selectors */}
          <div className="flex gap-3 mt-5">
            <MoneySelector
              label={"From"}
              selectedCurrency={fromCurrency}
              currencies={Object.keys(buyRate).filter((c) => c !== toCurrency)}
              onChange={setFromCurrency}
            />
            <MoneySelector
              label={"To"}
              selectedCurrency={toCurrency}
              currencies={Object.keys(buyRate).filter((c) => c !== fromCurrency)}
              onChange={setToCurrency}
            />
          </div>

          {/* Conversion Result */}
          <div className="text-center p-4 mt-6 bg-gray-50 rounded-xl shadow-sm">
            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {convertAmount === null && <p>Please Choose One</p>}
            {!loading && !error && convertAmount !== null && (
              <p className="text-lg font-semibold text-gray-700">
                {amount} {fromCurrency} ={" "}
                <span className="text-blue-500 font-bold">
                  {convertAmount} {toCurrency}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons under the box */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={handleBackKey}
          className="px-6 py-3 bg-gray-400 text-white rounded-xl shadow-md hover:scale-105 hover:bg-gray-500 transition duration-300"
        >
          Back
        </button>
        <PaymentSelector
          open={showPaymentSelector}
          onOpen={() => setShowPaymentSelector(true)}
          onClose={() => setShowPaymentSelector(false)}
          onPaymentSelect={handlePaymentSelect}
        />
      </div>

      {/* Show QR or Bank info */}
      {selectedMethod === "QR" && qrImage && (
        <div className="mt-8 text-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <p className="font-semibold text-gray-700">📷 Scan this QR to pay:</p>
          <img
            src={qrImage}
            alt="QR Code"
            className="mt-3 w-52 h-52 mx-auto border-2 border-gray-200 rounded-xl shadow-sm"
          />
        </div>
      )}

      {selectedMethod === "Bank" && bank && (
        <div className="mt-8 text-center bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <h3 className="font-bold text-lg text-green-600 mb-2">
            🏦 Bank Transfer Info
          </h3>
          <p className="text-gray-700">
            <strong>Bank:</strong> {bank.bankName}
          </p>
          <p className="text-gray-700">
            <strong>Account Name:</strong> {bank.accountName}
          </p>
          <p className="text-gray-700">
            <strong>Account Number:</strong> {bank.accountNumber}
          </p>
        </div>
      )}

      {selectedMethod && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setShowPaymentSelector(true)}
            className="px-5 py-3 bg-yellow-500 text-white rounded-xl shadow-md hover:scale-105 hover:bg-yellow-600 transition"
          >
            Change Method
          </button>
          <button
            onClick={() => handleSendToAdmin()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:scale-105 hover:bg-indigo-700 transition"
          >
            Send Slip to Admin
          </button>
        </div>
      )}
    </div>
  );
}

export default BuyMoneyChanger;


