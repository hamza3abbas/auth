"use client";
import { UserInfo } from "@/src/components/user-info";
import { useCurrentUser } from "@/src/hooks/user-current-user";
const ClientPage = () => {

   const user =  useCurrentUser();

     
  return (
    <UserInfo label="📱 Client Component" user={user}/>
  );
};

export default ClientPage  ;    