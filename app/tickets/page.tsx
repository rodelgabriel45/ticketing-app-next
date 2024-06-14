import prisma from '@/prisma/db';
import Datatable from './Datatable';

const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div>
      <Datatable tickets={tickets} />
    </div>
  );
};

export default Tickets;
