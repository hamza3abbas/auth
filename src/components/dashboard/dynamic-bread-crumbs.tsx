
"use client";

import { Breadcrumb ,BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from '../ui/breadcrumb';
import React from 'react';
import { SlashIcon } from '@radix-ui/react-icons';
import { getBreadcrumbs } from '@/src/lib/utils';
import { usePathname } from 'next/navigation';


const DynamicBreadcrumbs = () => {
  const pathname = usePathname(); 
  const breadcrumbs = getBreadcrumbs(pathname);
  if (breadcrumbs.length === 0) {
    return null; 
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumbs;
