import {  createContext, useState } from "react";

export const authStore = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
     
    const logOut = () =>{
        localStorage.removeItem("token");
        window.location.href = "/login";

    };

    return <authStore.Provider value={{user, setUser, logOut}}>{children}</authStore.Provider>;
    
};
export default AuthProvider;