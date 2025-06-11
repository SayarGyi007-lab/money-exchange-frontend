import { useEffect, useState } from "react"

const useGetPayment =  (baseCurrency)=>{
    const [bank, setBank] = useState({})
    const [qrImage, setQrImage] = useState("")
    const [errorPayment, setErrorPayment] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getPaymentByCurrency= async()=>{
            setLoading(true)

            try {
                const response = await fetch(`https://currency-rate-cwtr.onrender.com/payment/${baseCurrency}`)
                const data = await response.json()
                setBank(data.existed.bank)
                setQrImage(data.existed.qrImageUrl)
                
            } catch (error) {
                setErrorPayment("Error at fetching payment")
            }finally{
                setLoading(false)
            }
        }
        getPaymentByCurrency()
    },[baseCurrency])

    return {bank,qrImage,errorPayment,loading}
}

export default useGetPayment