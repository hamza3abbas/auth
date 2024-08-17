import { BarChartIcon, BoxIcon, DropdownMenuIcon, HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { LogoutButton } from "../auth/logout";
import { UserCircle,ShoppingCart, Search } from "lucide-react";

const DashboardNavBar = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <DropdownMenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <BoxIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <HomeIcon className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
          >
            <ShoppingCart  className="h-5 w-5" />
            Orders
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <BoxIcon className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <PersonIcon className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <BarChartIcon className="h-5 w-5" />
            Analytics
          </Link>
        </nav>
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our
                support team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <span  className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
          <Search className="h-5 w-5" />
          </span>
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <span className="h-5 w-5">
          <UserCircle className="h-5 w-5" />
          </span>
          
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={'/dashboard/settings'}>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton>
        <DropdownMenuItem>Logout</DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
  );
};

export default DashboardNavBar;