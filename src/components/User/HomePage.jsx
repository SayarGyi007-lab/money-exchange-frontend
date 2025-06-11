import React from 'react';
import useBuyRateFetch from '../../hooks/rates/buyRateFetch';
import useSellFetchRate from '../../hooks/rates/sellRateFetch';
import { useNavigate } from 'react-router-dom';
import UsegetAllRateFetch from '../../hooks/rates/getAllRatesFetch';

function HomePage() {
    const navigate = useNavigate()
    const baseCurrency = "MMK";
    const { buyRate, error, loading } = useBuyRateFetch(baseCurrency);
    const { sellRate } = useSellFetchRate(baseCurrency);
    const { date } = UsegetAllRateFetch()



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleSellMoneyExchanger = () => {
        navigate("/sell-money")
    }

    const handleBuyMoneyExchanger = () => {
        navigate("/buy-money")
    }

    return (
        <div className='bg-orange-100 min-h-screen flex flex-col items-center justify-center px-4 py-10'>
            
            <h1 className='text-2xl font-semibold text-gray-700 mb-8'>
                The Exchange Rates are Updated on {date ? new Date(date).toLocaleString() : 'N/A'}
            </h1>

            <div className='flex flex-col md:flex-row gap-y-10 md:gap-x-20 w-full max-w-5xl'>
                {/* Buy Rates */}
                <div className='bg-white rounded-2xl p-6 w-full md:w-1/2 shadow-md'>
                    <h2 className='text-xl text-center text-lime-500 font-bold mb-4'>Buy Rates</h2>
                    <ul className='space-y-4'>
                        {Object.entries(buyRate).map(([fromCurrency, rate]) => {
                            if (fromCurrency === baseCurrency) return null;
                            const converted = ((1 / rate) * buyRate[baseCurrency]).toFixed(2);
                            return (
                                <li key={fromCurrency} className='text-center text-lg font-medium'>
                                    1 {fromCurrency} = {converted} {baseCurrency}
                                </li>
                            );
                        })}
                    </ul>
                    <div className='flex justify-center mt-6'>
                        <button
                            onClick={handleBuyMoneyExchanger}
                            className='px-6 py-3 bg-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 font-semibold'
                        >
                            Exchange
                        </button>
                    </div>
                </div>

                {/* Sell Rates */}
                <div className='bg-white rounded-2xl p-6 w-full md:w-1/2 shadow-md'>
                    <h2 className='text-xl text-center text-amber-500 font-bold mb-4'>Sell Rates</h2>
                    <ul className='space-y-4'>
                        {Object.entries(sellRate).map(([fromCurrency, rate]) => {
                            if (fromCurrency === baseCurrency) return null;
                            const converted = ((1 / rate) * sellRate[baseCurrency]).toFixed(2);
                            return (
                                <li key={fromCurrency} className='text-center text-lg font-medium'>
                                    1 {fromCurrency} = {converted} {baseCurrency}
                                </li>
                            );
                        })}
                    </ul>
                    <div className='flex justify-center mt-6'>
                        <button
                            onClick={handleSellMoneyExchanger}
                            className='px-6 py-3 bg-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 font-semibold'
                        >
                            Exchange
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomePage;
