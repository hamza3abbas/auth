"use client";
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';

type ConvertLeadButtonProps = {
  leadId: string;
};

const ConvertLeadButton = ({ leadId }: ConvertLeadButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleConvert = () => {
    startTransition(async () => {
      setError(null);
      setSuccess(null);

      try {
        const response = await fetch(`/api/leads/${leadId}/convert`, {
          method: 'POST',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to convert lead');
        }

        setSuccess('Lead converted to customer successfully!');
        router.push('/customers'); // Redirect to the customers list page
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  return (
    <div className="mt-4">
      <Button variant="default" onClick={handleConvert} disabled={isPending}>
        {isPending ? 'Converting...' : 'Convert to Customer'}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default ConvertLeadButton;
