import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { mainContext } from "@/Context/context";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { LayoutDashboard, LogOut, ScrollText } from "lucide-react";
import {  NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Headers = () => {
  const { user,setLoggedIn,setToken } = useContext(mainContext);
  const parsedUser =  typeof user === "string" ? JSON.parse(user) : user;
  const navigate = useNavigate()
  
  const logoutUser = async()=>{
    try {
      const res = await axios.get('https://task-manager-hohf.onrender.com/users/logout',{withCredentials:true})
      if(res.data.success){
        setLoggedIn(false)
        localStorage.setItem("token","")
        localStorage.setItem("user","")
        setToken("")
        navigate('/')
        toast.success("User Logged Successfully")

      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="w-full h-[100px] flex justify-between items-center px-2">
      <span className="font-bold text-xl text-blue-600">Task Manager</span>
      {/* <span className="flex justify-center items-center gap-1 font-semibold text-sm cursor-pointer">
        <Avatar className="w-[30px] h-[30px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className=" "/>
          <AvatarFallback className=" ">CN</AvatarFallback>
        </Avatar>
        <span>{parsedUser?.username}</span>
      </span> */}
      <div className="w-[120px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="flex justify-around items-center gap-1 font-semibold text-sm cursor-pointer">
              <Avatar className="w-[30px] h-[30px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className=" "
                />
                <AvatarFallback className=" ">CN</AvatarFallback>
              </Avatar>
              <span>{user && parsedUser?.username}</span>
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[60px] flex flex-col items-start justify-start">
            <DropdownMenuCheckboxItem className="flex justify-start items-center gap-2 w-full m-1 p-0 cursor-pointer" onClick={logoutUser}>
              <span>
                <LogOut className="w-[15px] h-[15px]" />
              </span>
              <span className="cursor-pointer">Logout</span>
            </DropdownMenuCheckboxItem>

            <NavLink to='/dashboard' className={({isActive, isPending, isTransitioning})=>[
              isPending ? "":"",
              isActive ? "border-b-2 border-black":"",
              isTransitioning ? "":""
            ].join(" ")} viewTransition>
              <DropdownMenuCheckboxItem className="flex justify-start items-center gap-2 w-full my-1 p-0 cursor-pointer ">
                <span>
                  <LayoutDashboard className="w-[15px] h-[15px]" />
                </span>
                <span>Dashboard</span>
              </DropdownMenuCheckboxItem>
            </NavLink>
            <NavLink to='/task-list' className={({isActive, isPending, isTransitioning})=>[
              isPending ? "":"",
              isActive ? "border-b-2 border-black":"",
              isTransitioning ? "":""
            ].join(" ")} viewTransition >
              <DropdownMenuCheckboxItem className="flex justify-start items-center gap-2 w-full my-1 p-0 cursor-pointer ">
                <span>
                <ScrollText  className="w-[15px] h-[15px]"/>
                </span>
                <span>Task List</span>
              </DropdownMenuCheckboxItem>
            </NavLink>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Headers;
