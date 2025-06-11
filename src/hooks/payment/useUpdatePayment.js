 import { useCallback, useState } from "react"

const useUpdatePayment = () => {
    const [updatingPayment, setUpdatingPayment] = useState(false);
    const [errorPaymentUpdate, setErrorPaymentUpdate] = useState(false);
  
    const updatePayment = useCallback(async (formData, isNew=false) => {
      setUpdatingPayment(true);
  
      try {
        const response = await fetch("https://currency-rate-cwtr.onrender.com/payment/update", {
          method: "POST",
          body: formData,  // send FormData directly, do NOT set Content-Type header here
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          setErrorPaymentUpdate(data.message || "Failed to update payment");
          return false;
        }
  
        return true;  // or return data if you want
      } catch (error) {
        setErrorPaymentUpdate("Error at updating payment");
        return false;
      } finally {
        setUpdatingPayment(false);
      }
    }, []);
  
    return { updatingPayment, errorPaymentUpdate, updatePayment };
  };
  
  export default useUpdatePayment;
  