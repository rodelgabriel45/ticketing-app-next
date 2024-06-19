import Link from 'next/link';
import ToggleMode from '@/components/ToggleMode';
import MainNavLinks from './MainNavLinks';
import { getServerSession } from 'next-auth';
import options from '@/app/api/auth/[...nextauth]/options';

const MainNav = async () => {
  const session = await getServerSession(options);

  return (
    <div className='flex justify-between'>
      <MainNavLinks />

      <div className='flex gap-2 items-center'>
        {session ? (
          <Link href='/api/auth/signout?callbackUrl=/'>Logout</Link>
        ) : (
          <Link href='/api/auth/signin'>Login</Link>
        )}

        <ToggleMode />
      </div>
    </div>
  );
};

export default MainNav;
