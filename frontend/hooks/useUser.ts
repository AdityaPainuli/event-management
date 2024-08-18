import {useState , useEffect} from 'react';

interface User { 
    id:number;
    name:string;
    email:string;
    isAdmin:boolean;
}

const useUser = () => {
    const [user,setUser] = useState<User|null>(null);
    const [loading , setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null> (null)

    useEffect(()=> {
        const fetchUser = async() => {
            try {
                const token = localStorage.getItem("token");
                if(!token) {
                    throw new Error("No token found");
                }
                const response = await fetch("http://localhost:8080/api/user", {
                    method:"GET",
                    headers: {
                        'content-type':'application/json',
                        Authorization:`Bearer ${token}`
                    }
                });
                if(!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data : User = await response.json();
                setUser(data);
            }catch(err:any) {
                setError(err.message || "Something went wrong");
                console.log(err);
            }
        }
        fetchUser();
    },[]);

    return {user,loading,error};
}

export default useUser;