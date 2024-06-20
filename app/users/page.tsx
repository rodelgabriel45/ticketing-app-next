import { getServerSession } from 'next-auth';

import UserForm from '@/components/UserForm';
import DataTableUsers from './DataTable';
import prisma from '@/prisma/db';
import options from '../api/auth/[...nextauth]/options';

const Users = async () => {
  // const session = await getServerSession(options);
  // const users = await prisma.user.findMany();

  // if (session?.user.role !== 'ADMIN') {
  //   return <p className='text-destructive'>Admin access required.</p>;
  // }

  return (
    <div>
      <UserForm />
      <DataTableUsers users={users} />
    </div>
  );
};

export default Users;
