import { getServerSession } from 'next-auth';

import UserForm from '@/components/UserForm';
import DataTableUsers from './DataTable';
import prisma from '@/prisma/db';
import options from '../api/auth/[...nextauth]/options';

const Users = async () => {
  // const session = await getServerSession(options);

  // if (session?.user.role !== 'ADMIN') {
  //   return <p className='text-destructive'>Admin access required.</p>;
  // }

  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
      <DataTableUsers users={users} />
    </div>
  );
};

export default Users;
