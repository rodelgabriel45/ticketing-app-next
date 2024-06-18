import Link from 'next/link';

import TicketPriority from '@/components/TicketPriority';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { Ticket } from '@prisma/client';
import { SearchParams } from './page';

import { ArrowDown } from 'lucide-react';

interface DataTableProps {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const Datatable = ({ tickets, searchParams }: DataTableProps) => {
  return (
    <div className='w-full mt-5'>
      <div className='rounded-md sm:border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link href={{ query: { ...searchParams, orderBy: 'title' } }}>
                  Title
                </Link>
                {searchParams.orderBy === 'title' && (
                  <ArrowDown className='inline p-1' />
                )}
              </TableHead>
              <TableHead>
                <div className='flex justify-center'>
                  <Link
                    href={{ query: { ...searchParams, orderBy: 'status' } }}
                  >
                    Status
                  </Link>
                  {searchParams.orderBy === 'status' && (
                    <ArrowDown className='inline p-1' />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className='flex justify-center'>
                  <Link
                    href={{ query: { ...searchParams, orderBy: 'priority' } }}
                  >
                    Priority
                  </Link>
                  {searchParams.orderBy === 'priority' && (
                    <ArrowDown className='inline p-1' />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <Link
                  href={{ query: { ...searchParams, orderBy: 'createdAt' } }}
                >
                  Created At
                </Link>
                {searchParams.orderBy === 'createdAt' && (
                  <ArrowDown className='inline p-1' />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((ticket) => (
                  <TableRow key={ticket.id} data-href='/'>
                    <TableCell>
                      <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                    </TableCell>
                    <TableCell>
                      <div className='flex justify-center'>
                        <TicketStatusBadge status={ticket.status} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className='flex justify-center'>
                        <TicketPriority priority={ticket.priority} />
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(ticket.createdAt)}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Datatable;
