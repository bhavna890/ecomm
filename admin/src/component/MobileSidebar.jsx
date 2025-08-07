import { useContext } from "react";
import Sidebar from "./sidebar";
import { appStore } from "../store/app.store";

const MobileSidebar = () => {
    const { sidebar, closeSidebar } = useContext(appStore);
    return (
        <div className={`fixed inset-0 z-50 mt-[50px] transtion-all duration-300 ${sidebar ? "visible" :"invisible"}`}>
        {/*Backdrop*/}
        <div className={`absolute inset-0 bg-gray-500/55 transition-opacity duration-300 ${sidebar ? "opacity-100": "opacity-0 pointer-event-none"}`}
        onClick={closeSidebar}>
            </div>    
            {/* <Sidebar/> */}
            <div className={`fixed top-[50px] left-0 shadow-lg transform transtion-transform duration-300 ${sidebar ? "translate-x-0": "-translate-x-full"}`}>
                <Sidebar/>
            </div>
        </div>
    )
}

export default MobileSidebar;