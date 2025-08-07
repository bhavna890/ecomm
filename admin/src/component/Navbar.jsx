import { PanelRightClose, ShieldUser } from "lucide-react";
import { useContext } from "react";
import { appStore } from "../store/app.store";
import { PanelRightOpen } from "lucide-react";
import { authStore } from "../store/auth.store";


const Navbar = () =>{
  const {logOut, user} = useContext(authStore);
  const { sidebar, openSidebar, closeSidebar } = useContext (appStore);
    return (
      <div className="flex justify-between item-center p-3 border-b border-gray-300 h-[50px] select-none ">
        <div className="flex item-center gap-2">
        <div className="sm:hidden cursor-pointer">{sidebar ? <PanelRightOpen onClick={closeSidebar}/> : <PanelRightClose onClick={openSidebar}/>} </div>
        <h1 className="font-bold">Admin</h1>
        </div>
        <div className="flex items-center gap-2">
        <ShieldUser/>
        <button onClick={logOut} className="bg-red-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold">
          LogOut
        </button>
        </div>
      </div>
    );
};

export default Navbar;