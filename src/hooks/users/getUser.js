import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useGetUser = (userId) =>{
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!userId){
            console.log("no user ",);
            return
        }
            
        const fetchUser = async()=>{

            setLoading(true)
            
            try {
                const response = await fetch(`https://currency-rate-cwtr.onrender.com/user/${userId}`)
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                  }
                const data = await response.json()
                
                console.log(data);
                setUserData(data)
                
                
            } catch (error) {
                setError("Please go to homepage for another transfer.")
                navigate("/")
            }finally{
                setLoading(false)
            }
        }
        fetchUser()
    },[userId])
    return {userData, loading, error}
}

export default useGetUser