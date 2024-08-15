"use client";
import { CustomerCreateSchema } from "@/src/schemas";
import { useEffect, useState } from "react";
import * as z from "zod";
export type Customer = z.infer<typeof CustomerCreateSchema> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

type CustomerDetailsProps = {
  customerId: string;
};

const CustomerDetails = ({ customerId }: CustomerDetailsProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${customerId}`);
        if (!response.ok) throw new Error('Failed to fetch customer');
        const data: Customer = await response.json();
        setCustomer(data);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mb-4">
      <h2 className="text-2xl font-semibold">Details</h2>
      <p><strong>Name:</strong> {customer?.name}</p>
      <p><strong>Email:</strong> {customer?.email}</p>
      <p><strong>Phone:</strong> {customer?.phone}</p>
      <p><strong>Address:</strong> {customer?.address}</p>
    </div>
  );
};

export default CustomerDetails;