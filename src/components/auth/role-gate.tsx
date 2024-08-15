"use client";

import { useCurrentRole } from "@/src/hooks/user-current-user";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
     children : React.ReactNode;
    allowedRole : UserRole;
}

export const RoleGate = ({children,allowedRole,}:RoleGateProps)=>{
     const role = useCurrentRole();
    
     if(role !== allowedRole){
        return (
            <FormError message="You dont have the permission to view this content!   "/>
        )
     }

     return ( 
        <>
        {children   }
        </>
     )
}