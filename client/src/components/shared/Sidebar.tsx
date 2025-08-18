import useAppStore from "@/store/app.store";
import { X } from "lucide-react";
// import React from "react";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  const { sidebar, closeSidebar } = useAppStore();

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${sidebar ? "visible" : "invisible"}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-gray-500/55 transition-opacity duration-300 ${
          sidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed h-screen left-0 shadow-lg transform transition-transform duration-300 
      ${sidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-white w-[250px] h-full py-4">
          <div className="flex justify-between items-center px-4">
            <h1 className="text-lg font-bold">Hi, User</h1>
            <X className="text-2xl cursor-pointer" onClick={closeSidebar} />
          </div>

          <Separator className="my-4 h-1 bg-gray-600" />

          <div className="px-4">Sidebar Content</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;