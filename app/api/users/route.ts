import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

import { userSchema } from '@/ValidationSchemas/users';
import prisma from '@/prisma/db';
import options from '../auth/[...nextauth]/options';

export const POST = async (request: NextRequest) => {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: 'Not Authenticated' }, { status: 401 });
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });
  }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (duplicate) {
    return NextResponse.json({ error: 'User already exist.' }, { status: 409 });
  }

  const hashedPassword = await bcryptjs.hash(body.password, 10);
  body.password = hashedPassword;

  const newUser = await prisma.user.create({
    data: { ...body },
  });

  const { password, ...userWithoutPassword } = newUser;

  return NextResponse.json(userWithoutPassword, { status: 201 });
};
