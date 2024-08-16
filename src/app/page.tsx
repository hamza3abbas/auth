import { Button } from "@/src/components/ui/button"; 
import { cn } from "@/src/lib/utils";
import { poppins } from "@/src/lib/fonts";
import { LoginButton } from "@/src/components/auth/login-button";
import { ModeToggle } from "../components/switch-theme";
export default function Home() {
const font = poppins;
  return (
   <main className="">
    <div className="">
      <ModeToggle/>
      <h1 className="">
       🔐 Auth
      </h1>
      <p className={cn("text-white text-lg",font.className,)}>
        Simple auth service
      </p>
      <div>
       <LoginButton>
       <Button variant={'secondary'} size='lg'>
           Sign In
        </Button> 
       </LoginButton>
      </div>
    </div>
   </main>
  );
}
