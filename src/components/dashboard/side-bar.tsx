"use client";
import { useCurrentUser } from '@/src/hooks/user-current-user';
import { ArrowUpIcon, BellIcon, BoxIcon, DashboardIcon, EnvelopeOpenIcon, GearIcon, HomeIcon, InfoCircledIcon, PaperPlaneIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { Settings } from 'lucide-react';


const Sidebar = () => {
    const user = useCurrentUser();
    const pathname = usePathname(); // Get the current path
    console.log(pathname);
    const navItems = {
      ADMIN: [
        { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon className="h-4 w-4" /> },
        { name: 'Customers', path: '/dashboard/customers', icon: <PersonIcon className="h-4 w-4" /> },
        { name: 'Leads', path: '/dashboard/leads', icon: <ArrowUpIcon className="h-4 w-4" /> },
        { name: 'Invoices', path: '/dashboard/invoices', icon: <PaperPlaneIcon className="h-4 w-4" /> },
      ],
      MANAGER: [
        { name: 'Home', path: '#', icon: <HomeIcon className="h-4 w-4" /> },
        { name: 'Profile', path: '#', icon: <GearIcon className="h-4 w-4" /> },
        { name: 'Orders', path: '#', icon: <GearIcon className="h-4 w-4" /> },
        { name: 'Settings', path: '#', icon: <GearIcon className="h-4 w-4" /> },
      ],
      USER: [
        { name: 'Home', path: '#', icon: <HomeIcon className="h-4 w-4" /> },
        { name: 'About', path: '#', icon: <InfoCircledIcon className="h-4 w-4" /> },
        { name: 'Contact', path: '#', icon: <EnvelopeOpenIcon className="h-4 w-4" /> },
      ],
      DRIVER: [
        { name: 'Home', path: '#', icon: <HomeIcon className="h-4 w-4" /> },
        { name: 'About', path: '#', icon: <InfoCircledIcon className="h-4 w-4" /> },
        { name: 'Contact', path: '#', icon: <EnvelopeOpenIcon className="h-4 w-4" /> },
      ],
      EMPLOYEE: [
        { name: 'Home', path: '#', icon: <HomeIcon className="h-4 w-4" /> },
        { name: 'About', path: '#', icon: <InfoCircledIcon className="h-4 w-4" /> },
        { name: 'Contact', path: '#', icon: <EnvelopeOpenIcon className="h-4 w-4" /> },
      ],
    };
  
    // Default to USER role if userRole is not yet loaded
    const items = navItems[user?.role ?? 'USER'];
  
    return (
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <span>ABS SOLUTION</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {items.map((item) => (
                  <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                    pathname === item.path
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <div x-chunk="dashboard-02-chunk-0">
            
              <Link
                 
                  href={'/dashboard/settings'}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                    pathname === '/dashboard/settings'
                      ? 'bg-muted text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  {<Settings/>}
                  {'Settings'}
                </Link>
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;