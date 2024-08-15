"use client";

import { logout } from "@/src/actions/logout";
import { ReactNode } from "react";

interface LogoutButtonPropos {
     children : React.ReactNode
};

export const LogoutButton = ({
    children
}: LogoutButtonPropos) => {
    const onClick  = () => {
    logout();
    }

    return (
        <span onClick={onClick} className="cursor-pointer ">
             {children}
        </span>
    )
}