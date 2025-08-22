import React from "react";
import useBuyRateFetch from "../../hooks/rates/buyRateFetch";
import useSellFetchRate from "../../hooks/rates/sellRateFetch";
import { useNavigate } from "react-router-dom";
import UsegetAllRateFetch from "../../hooks/rates/getAllRatesFetch";

function HomePage() {
  const navigate = useNavigate();
  const baseCurrency = "MMK";
  const { buyRate, error, loading } = useBuyRateFetch(baseCurrency);
  const { sellRate } = useSellFetchRate(baseCurrency);
  const { date } = UsegetAllRateFetch();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-orange-200 to-orange-400">
        <span className="text-xl font-semibold text-white animate-pulse">
          Loading exchange rates...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-red-100">
        <span className="text-xl font-semibold text-red-600">{error}</span>
      </div>
    );
  }

  const handleSellMoneyExchanger = () => {
    navigate("/sell-money");
  };

  const handleBuyMoneyExchanger = () => {
    navigate("/buy-money");
  };

  return (
    <div className="bg-orange-50  min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center drop-shadow-lg">
        💱 Exchange Rates <br />
        <span className="text-lg md:text-xl font-medium text-gray-600">
          Updated on{" "}
          {date ? new Date(date).toLocaleString() : "N/A"}
        </span>
      </h1>

      <div className="flex flex-col md:flex-row gap-y-10 md:gap-x-14 w-full max-w-6xl">
        {/* Buy Rates */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 w-full md:w-1/2 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl text-center text-lime-600 font-extrabold mb-6">
            Buy Rates
          </h2>
          <ul className="space-y-4">
            {Object.entries(buyRate).map(([fromCurrency, rate]) => {
              if (fromCurrency === baseCurrency) return null;
              const converted = ((1 / rate) * buyRate[baseCurrency]).toFixed(2);
              return (
                <li
                  key={fromCurrency}
                  className="text-center text-lg font-medium text-gray-700 bg-gray-50 rounded-xl py-3 shadow-sm hover:bg-gray-100 transition"
                >
                  1 {fromCurrency} ={" "}
                  <span className="font-bold text-lime-600">
                    {converted} {baseCurrency}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleBuyMoneyExchanger}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 font-semibold"
            >
              Exchange Now
            </button>
          </div>
        </div>

        {/* Sell Rates */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 w-full md:w-1/2 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl text-center text-amber-600 font-extrabold mb-6">
            Sell Rates
          </h2>
          <ul className="space-y-4">
            {Object.entries(sellRate).map(([fromCurrency, rate]) => {
              if (fromCurrency === baseCurrency) return null;
              const converted = ((1 / rate) * sellRate[baseCurrency]).toFixed(2);
              return (
                <li
                  key={fromCurrency}
                  className="text-center text-lg font-medium text-gray-700 bg-gray-50 rounded-xl py-3 shadow-sm hover:bg-gray-100 transition"
                >
                  1 {fromCurrency} ={" "}
                  <span className="font-bold text-amber-600">
                    {converted} {baseCurrency}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSellMoneyExchanger}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 font-semibold"
            >
              Exchange Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

