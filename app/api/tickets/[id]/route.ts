import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { ticketPatchSchema } from '@/ValidationSchemas/ticket';
import prisma from '@/prisma/db';
import options from '../../auth/[...nextauth]/options';

interface Props {
  params: { id: string };
}

export const PATCH = async (request: NextRequest, { params }: Props) => {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }

  if (session.user.role !== 'ADMIN' && session.user.role !== 'TECH') {
    return NextResponse.json({ error: 'Not Authorized.' }, { status: 401 });
  }

  const body = await request.json();
  const validation = ticketPatchSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket Not Found' }, { status: 404 });
  }

  if (body.assignedToUserId) {
    body.assignedToUserId = parseInt(body.assignedToUserId);
  }

  const updateTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: { ...body },
  });

  return NextResponse.json(updateTicket);
};

export const DELETE = async (request: NextRequest, { params }: Props) => {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Not authorized to delete ticket.' },
      { status: 401 }
    );
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!ticket) {
    return NextResponse.json({ error: 'Ticket Not Found' }, { status: 404 });
  }

  await prisma.ticket.delete({ where: { id: ticket.id } });

  return NextResponse.json({ message: 'Ticket deleted successfully' });
};
