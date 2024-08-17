import { ReactNode } from 'react';
import { NavBar } from './_components/navbar';
import DynamicBreadcrumbs from '@/src/components/dashboard/dynamic-bread-crumbs';
import Link from 'next/link';
import { Menu, Package, Package2, Sheet } from 'lucide-react';
import { SheetContent, SheetTrigger } from '@/src/components/ui/sheet';
import { Button } from '@/src/components/ui/button';

const ProtectedLayout  = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavBar/>
      <div className='h-full w-full flex flex-col gap-y-10 items-center justify-center'>
      {children}
      </div>
     
    </div>
  );
};

export default ProtectedLayout ;