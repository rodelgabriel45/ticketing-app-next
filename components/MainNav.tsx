import Link from 'next/link';
import ToggleMode from '@/components/ToggleMode';
import MainNavLinks from './MainNavLinks';

const MainNav = () => {
  return (
    <div className='flex justify-between'>
      <MainNavLinks />

      <div className='flex gap-2 items-center'>
        <Link href='/'>Logout</Link>
        <ToggleMode />
      </div>
    </div>
  );
};

export default MainNav;
