import { useEffect, useState } from "react"

const useBuyRateFetch = (baseCurrency)=>{
    const [buyRate, setBuyRate] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false) 
    

    useEffect(()=>{
        const moneyFetch = async()=>{
            setLoading(true)
            
            try {
                const response = await fetch("https://currency-rate-cwtr.onrender.com/api/buy_rate")
                const data = await response.json()
                setBuyRate(data.buyRates)
                
                
            } catch (error) {
                setError("Error at buy rate money fetching")
            }
            finally{
                setLoading(false)
            }
        }
        moneyFetch()
    },[baseCurrency])
    return {buyRate, error,loading}
}

export default useBuyRateFetch