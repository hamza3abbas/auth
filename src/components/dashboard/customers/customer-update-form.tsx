"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { FormError } from "@/src/components/form-error";
import { FormSuccess } from "@/src/components/form-success";
import { CustomerUpdateSchema } from "@/src/schemas";
import * as z from "zod";
type CustomerUpdateFormProps = {
  customerId: string;
};

const CustomerUpdateForm = ({ customerId }: CustomerUpdateFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof CustomerUpdateSchema>>({
    resolver: zodResolver(CustomerUpdateSchema),
  });

  const onSubmit = (values: z.infer<typeof CustomerUpdateSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      fetch(`/api/customers/${customerId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to update customer");
          }
          setSuccess("Customer updated successfully!");
        })
        .catch((error) => {
          setError(error.message);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} placeholder="john.doe@example.com" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} placeholder="123-456-7890" type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} placeholder="123 Main St" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Updating..." : "Update Customer"}
        </Button>
      </form>
    </Form>
  );
};

export default CustomerUpdateForm;
