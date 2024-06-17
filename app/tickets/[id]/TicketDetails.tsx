import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TicketStatusBadge from '@/components/TicketStatusBadge';
import TicketPriority from '@/components/TicketPriority';
import { formatDate } from '@/lib/utils';
import { Ticket } from '@prisma/client';
import { buttonVariants } from '@/components/ui/button';

interface Props {
  ticket: Ticket;
}

const TicketDetails = ({ ticket }: Props) => {
  return (
    <div className='lg:grid lg:grid-cols-4'>
      <Card className='mx-4 mb-4 lg:col-span-3'>
        <CardHeader>
          <div className='flex justify-between items-center'>
            <TicketStatusBadge status={ticket.status} />
            <div className='flex'>
              <TicketPriority priority={ticket.priority} />
            </div>
          </div>

          <CardTitle>{ticket.title}</CardTitle>
          <CardDescription>
            Created: {formatDate(ticket.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent className='prose dark:prose-invert'>
          <ReactMarkdown>{ticket.description}</ReactMarkdown>
        </CardContent>
        <CardFooter>Updated: {formatDate(ticket.updatedAt)}</CardFooter>
      </Card>

      <div className='mx-4 flex gap-3 lg:flex-col lg:mx-0'>
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({ variant: 'default' })}`}
        >
          Edit Ticket
        </Link>

        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`${buttonVariants({ variant: 'destructive' })}`}
        >
          Delete Ticket
        </Link>
      </div>
    </div>
  );
};

export default TicketDetails;
