import prisma from '@/prisma/db';
import Datatable from './Datatable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

interface SearchParams {
  page: string;
  page_size: string;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page_size = parseInt(searchParams.page_size) || 10;
  const page = parseInt(searchParams.page) || 1;
  const ticketCount = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({
    take: page_size,
    skip: (page - 1) * page_size,
  });

  return (
    <div>
      <Link
        href='/tickets/new'
        className={buttonVariants({ variant: 'default' })}
      >
        New Ticket
      </Link>
      <Datatable tickets={tickets} />
      <Pagination
        itemCount={ticketCount}
        page_size={page_size}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
