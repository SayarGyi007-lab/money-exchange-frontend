import { useEffect, useState } from "react"


const UsegetAllRateFetch=()=>{
    const [rate, setRate] = useState({})
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState()
    

    useEffect(()=>{
        const fetchRate = async()=>{
           setLoading(true)
           try {
            const response = await fetch("https://currency-rate-cwtr.onrender.com/api/admin/rates",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await response.json()
            setRate(data.rates)
            
            const latestDate = data.rates.reduce((latest, current) => {
                return new Date(current.updatedAt) > new Date(latest.updatedAt) ? current : latest;
              }).updatedAt;
        
              setDate(latestDate);
          

           } catch (error) {
            setError("Error at fetching all exchange rates")
           }finally{
            setLoading(false)
           }
        }
        fetchRate()
    },[])
    return {error,loading,rate,date,setRate}
}

export default UsegetAllRateFetch