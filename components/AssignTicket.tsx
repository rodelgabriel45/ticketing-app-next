'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Ticket, User } from '@prisma/client';

interface Props {
  ticket: Ticket;
  users: User[];
}

const AssignTicket = ({ ticket, users }: Props) => {
  const [isAssigning, setIsAssigning] = useState(false);

  const assignTicket = async (userId: string) => {
    try {
      setIsAssigning(true);
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assignedToUserId: userId === '0' ? null : userId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data);
      }

      toast.success(
        userId === '0' ? 'Assigned user removed' : 'User successfully assigned'
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div>
      <Select
        defaultValue={ticket.assignedToUserId?.toString()}
        onValueChange={assignTicket}
        disabled={isAssigning}
      >
        <SelectTrigger>
          <SelectValue
            placeholder='Assign User...'
            defaultValue={ticket.assignedToUserId?.toString()}
          ></SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value='0'>Unassign</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssignTicket;
