import { useEffect, useState } from "react"

const useSellFetchRate =(fromCurrency)=>{
    const [sellRate, setSellRate] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(()=>{
        const sellMoneyFetch=async ()=>{
            setLoading(true)
            try {
                const response = await fetch("https://currency-rate-cwtr.onrender.com/api/sell_rate")
                const data = await response.json()
                setSellRate(data.sellRate)
                
            } catch (error) {
                setError("Error at fetching sell rate")
            }
            finally{
                setLoading(false)
            }
        }
        sellMoneyFetch()
       
    },[fromCurrency])

    return {sellRate, loading, error}
}

export default useSellFetchRate