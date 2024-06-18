import prisma from '@/prisma/db';
import Datatable from './Datatable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';
import StatusFilter from '@/components/StatusFilter';
import { Status } from '@prisma/client';

interface SearchParams {
  page: string;
  page_size: string;
  status: Status;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page_size = parseInt(searchParams.page_size) || 10;
  const page = parseInt(searchParams.page) || 1;

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  if (status) {
    where = {
      status,
    };
  } else {
    where = {
      NOT: [{ status: 'CLOSED' as Status }],
    };
  }

  const ticketCount = await prisma.ticket.count({ where });

  const tickets = await prisma.ticket.findMany({
    where,
    take: page_size,
    skip: (page - 1) * page_size,
  });

  return (
    <div>
      <div className='flex gap-2'>
        <Link
          href='/tickets/new'
          className={buttonVariants({ variant: 'default' })}
        >
          New Ticket
        </Link>
        <StatusFilter />
      </div>

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
