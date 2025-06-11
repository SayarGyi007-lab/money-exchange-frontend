export const handleDeleteCurrency = async (currency)=>{
    try {
        const resRate = await fetch(`https://currency-rate-cwtr.onrender.com/api/delete-currency/${currency}`,{
            method: "DELETE"
        })
        const resPayment = await fetch(`https://currency-rate-cwtr.onrender.com/payment/${currency}`,{
            method: "DELETE"
        })
        if(!resRate.ok || !resPayment.ok) throw new Error("Api fetching error")

        alert(`${currency} deleted successfully`)
    } catch (error) {
        console.log("Error at deleting currency")
        alert(`Failed to delete ${currency}`)
    }
}