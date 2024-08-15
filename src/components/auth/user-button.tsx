"use client";


import { FaUser, FaUserAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu ,DropdownMenuContent ,DropdownMenuItem,DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useCurrentUser } from "@/src/hooks/user-current-user";
import { LogoutButton } from "./logout";
import { ExitIcon } from "@radix-ui/react-icons";

export const UserButton = () => {

  const user = useCurrentUser();

  return (
   <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
         <AvatarImage src={user?.image || ' '}/>
         <AvatarFallback className="bg-sky-500">
          <span className="text-white">
          <FaUserAlt />
          </span>
         </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
   <DropdownMenuContent>
   <LogoutButton>
      <DropdownMenuItem>
        <ExitIcon className="h-4 w-4 mr-2"/>
        Logout
      </DropdownMenuItem>
    </LogoutButton>
   </DropdownMenuContent>
   </DropdownMenu>
  );
};

