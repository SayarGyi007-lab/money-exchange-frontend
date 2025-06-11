import { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://currency-rate-cwtr.onrender.com/user/get-users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
        setError("Error at fetching all users: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  return { userData, loading, error, setUserData};
};

export default useGetAllUsers;
