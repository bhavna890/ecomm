import { useContext, useEffect, useState } from "react"
import {authStore} from "../store/auth.store";

export const useAuth = () => {
    const {user, setUser } = useContext(authStore);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user){
            const token = localStorage.getItem("token");
            const fetchInfo = async () => {
                try{
                    const res = await fetch("http://localhost:4000/user/me",{
                        method:"GET",
                        headers:{
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const data = await res.json();
                    if(data.success){
                        setUser(data.data);
                    }else{
                        throw new Error();
                    }
                }catch(error){
                    localStorage.removeItem("token");
                    localStorage.removeItem("refToken");
                    console.log(error);
                }finally{
                    setLoading(false);
                }

            };
            fetchInfo();

        }
    },[]);
            
      
    return {user, loading};
}