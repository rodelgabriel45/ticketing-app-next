import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

import { userSchema } from '@/ValidationSchemas/users';
import prisma from '@/prisma/db';

interface Props {
  params: { id: string };
}

export const PATCH = async (request: NextRequest, { params }: Props) => {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (body.password && body.password !== '') {
    const hashedPassword = await bcryptjs.hash(body.password, 10);
    body.password = hashedPassword;
  } else {
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });

    if (duplicateUsername) {
      return NextResponse.json(
        { error: 'This username already exist.' },
        { status: 409 }
      );
    }
  }

  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      ...body,
    },
  });

  const { password, ...userWithoutPassword } = updateUser;

  return NextResponse.json(userWithoutPassword, { status: 200 });
};
