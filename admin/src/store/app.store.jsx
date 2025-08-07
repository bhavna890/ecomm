import { createContext, useState } from "react";

export const appStore = createContext({});

const AppProvider = ( {children} ) => {
    const [sidebar, setSidebar]= useState(false);
    const openSidebar = () => setSidebar(true);
    const closeSidebar = () => setSidebar(false);
    return  <appStore.Provider value={{sidebar, openSidebar, closeSidebar }}>{children}</appStore.Provider>;
    
};

export default AppProvider;