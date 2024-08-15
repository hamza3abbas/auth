"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';

type Props = {
  customerId: string;
};

const DeleteCustomerButton = ({ customerId }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    startTransition(async () => {
      setError(null);

      try {
        const response = await fetch(`/api/customers/${customerId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete customer');
        router.push('/customers');
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  return (
    <div className="mt-4">
      <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
        {isPending ? 'Deleting...' : 'Delete Customer'}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default DeleteCustomerButton;
