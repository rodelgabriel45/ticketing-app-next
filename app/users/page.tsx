import UserForm from '@/components/UserForm';
import DataTableUsers from './DataTable';
import prisma from '@/prisma/db';

const Users = async () => {
  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm />
      <DataTableUsers users={users} />
    </div>
  );
};

export default Users;
