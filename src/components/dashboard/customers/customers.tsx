"use client";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../../ui/button";
import DynamicBreadcrumbs from "../dynamic-bread-crumbs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import { Customer } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      setError(null);

      try {
        const response = await fetch(`/api/customers/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete customer');

        // Remove the deleted customer from the list immediately
        setCustomers((prevCustomers) =>
          prevCustomers ? prevCustomers.filter((customer) => customer.id !== id) : null
        );

        // Optionally, refresh the page after a delay to reflect the changes
        setTimeout(() => {
          router.refresh();
        }, 500);
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        const data = await response.json();
        if (response.ok) {
          setCustomers(data);
        } else {
          setError(data.error || 'Failed to fetch customers');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <>
        <div className="flex items-center">
          <DynamicBreadcrumbs />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
            {error}
            </h3>
            
            <p className="text-sm text-muted-foreground"></p>
          </div>
        </div>
      </>
    );
  }

  if (customers?.length === 0) {
    return (
      <>
        <div className="flex items-center">
          <DynamicBreadcrumbs />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no customers records
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start adding customers.
            </p>
            <Link href={'/dashboard/customers/add-customer'}>
            <Button className="mt-4">Add Customer</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center px-6">
        <DynamicBreadcrumbs />
        <div className="ml-auto flex items-center gap-2 ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Link href={'/dashboard/customers/add-customer'}>
            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Customer
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
            <CardDescription>
              Manage your customers and view their activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers?.map((customer) => (
                  <TableRow key={customer?.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={`${customer?.name}'s image`}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={"/profile.jpg"}
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      <Badge variant={customer?.address ? "success" : "destructive"}>
                        {customer.address ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Link href={`/dashboard/customers/${customer?.id}`}>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem onClick={() => {
                            handleDelete(customer?.id);
                          }}>Delete</DropdownMenuItem>
                          <DropdownMenuItem>Debug</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{customers?.length}</strong> of{" "}
              <strong>{customers?.length}</strong> customers
            </div>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};

export default Customers;
