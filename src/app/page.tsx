import { Button } from "@/src/components/ui/button"; 
import { cn } from "@/src/lib/utils";
import { poppins } from "@/src/lib/fonts";
import { LoginButton } from "@/src/components/auth/login-button";
export default function Home() {
const font = poppins;
  return (
   <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
    <div className="space-y-6 text-center">
      <h1 className="text-6xl font-semibold text-white drop-shadow-md">
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
