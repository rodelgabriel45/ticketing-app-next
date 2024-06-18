import UserForm from '@/components/UserForm';
import prisma from '@/prisma/db';
import { useRouter } from 'next/router';
import { Form, useForm } from 'react-hook-form';

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const router = useRouter();
  // const form = useForm<UserFormData>({
  //   resolver: zodResolver(userSchema),
  // });

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return <p className='text-destructive'>User not found</p>;
  }

  user.password = '';
  return <UserForm user={user} />;
};

export default EditUser;
