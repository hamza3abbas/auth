"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"

export const NavBar = () => {
    
    const pathname = usePathname(); 
    return (
     
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
             <Link
               href="/dashboard/server"
               className="text-muted-foreground transition-colors hover:text-foreground"
             >
               Server
             </Link>
             <Link
               href="/dashboard/client"
               className="text-muted-foreground transition-colors hover:text-foreground"
             >
               Client
             </Link>
             <Link
               href="/dashboard/admin"
               className="text-muted-foreground transition-colors hover:text-foreground"
             >
               Admin
             </Link>
             <Link
               href="/dashboard/settings"
               className="text-muted-foreground transition-colors hover:text-foreground"
             >
               Settings
             </Link>
           </nav>
          
           </header>
        
    )
}   