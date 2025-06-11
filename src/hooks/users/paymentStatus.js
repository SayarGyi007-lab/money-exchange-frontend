export const receivedPayment = async (userId) =>{
    try {
        const response = await fetch(`https://currency-rate-cwtr.onrender.com/user/${userId}/receive-payment`,
            {
                method : 'PATCH',
                headers: {'ContentType':'application/json'}
            }
        )
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Error at fetching recieve payment staus");
        return null
    }
}

export const errorPayment = async (userId) =>{
    try {
        const response = await fetch(`https://currency-rate-cwtr.onrender.com/user/${userId}/error-payment`,
            {
                method : 'PATCH',
                headers: {'ContentType':'application/json'}
            }
        )
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Error at fetching error payment staus");
        return null
    }
}

export const transferPayment = async (userId) =>{
    try {
        const response = await fetch(`https://currency-rate-cwtr.onrender.com/user/${userId}/transfer-payment`,
            {
                method : 'PATCH',
                headers: {'ContentType':'application/json'}
            }
        )
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Error at fetching transfer payment staus");
        return null
    }
}
