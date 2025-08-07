import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

const Layout = ({ children }) =>{
    return (
   <div>
    <Navbar/>
   <div className="flex">
    <MobileSidebar/>
    <DesktopSidebar/>


    <div className="flex-1 p-3">
       {children}
    </div>
   </div>
   </div>
    )
}

export default Layout;