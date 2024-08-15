import { getCurrentUser } from "@/src/lib/auth";
import { UserInfo } from "@/src/components/user-info";
const ServerPage = async () => {

   const user = await   getCurrentUser();

     
  return (
    <UserInfo label="🖥️ Server Component" user={user}/>
  );
};

export default ServerPage ;   