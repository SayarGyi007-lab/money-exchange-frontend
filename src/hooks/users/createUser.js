import { useState } from "react"

const useCreateUser = ()=>{
    const [userData , setUserData] = useState(null)
    const [error , setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const register = async(formData) =>{
        setLoading(true)
        setError(null)
        setUserData(null)
        try {
            const response = await fetch("https://currency-rate-cwtr.onrender.com/user/create",{
                method: "POST",
                body: formData
            })

            const data = await response.json()
            if (!response.ok) {
                const text = await response.text()
                throw new Error(`Server error ${response.status}: ${text}`)
              }
            const user = data.userInfo || data;
            setUserData(user)
            console.log(user._id);
            
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    return {register,userData,error,loading}
}
export default useCreateUser