'use client';

import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import toast from 'react-hot-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

interface Props {
  ticketId: number;
}

const DeleteButton = ({ ticketId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteTicket = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch('/api/tickets/' + ticketId, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data);
      }

      toast.success(data.message);
      router.push('/tickets');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isDeleting}
        className={buttonVariants({ variant: 'destructive' })}
      >
        Delete Ticket
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteTicket}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
