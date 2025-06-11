export const handleDeleteUser = async(userId) =>{
    try {
        const response = await fetch(`https://currency-rate-cwtr.onrender.com/user/delete/${userId}`,
            {
                method: "DELETE"
            }
        )
        if(!response.ok) throw new Error("Error at deleting")
        alert("You have deleted successfully")
    } catch (error) {
        console.log("Error at deleting currency")
        alert(`Failed to delete this person`)
    }
}
