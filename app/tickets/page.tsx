import prisma from '@/prisma/db';
import Datatable from './Datatable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <Link
        href='/tickets/new'
        className={buttonVariants({ variant: 'default' })}
      >
        New Ticket
      </Link>
      <Datatable tickets={tickets} />
    </div>
  );
};

export default Tickets;
