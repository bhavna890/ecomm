// import React from "react";
import { Button } from "../ui/button";
import { Sidebar as SidebarIcon } from "lucide-react";
import useAppStore from "@/store/app.store";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Navbar = () => {
  const { openSidebar } = useAppStore();
  const { user, loading } = useAuth();

  return (
    <div className="w-full h-[60px] flex justify-between items-center px-5 py-3 border-b border-gray-300 shadow-lg">
      <div className="flex items-center gap-3">
        <SidebarIcon onClick={openSidebar} className="cursor-pointer" />
        <Sidebar />
        <Link to="/">
          <h1 className="text-2xl font-bold">E-commerce</h1>
        </Link>
      </div>

      {user ? (
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="uppercase">{user.name[0]}</AvatarFallback>
        </Avatar>
      ) : (
        <Button variant="link" className="cursor-pointer">
          <Link to="/signin">Sign In</Link>
        </Button>
      )}
    </div>
  );
};

export default Navbar;