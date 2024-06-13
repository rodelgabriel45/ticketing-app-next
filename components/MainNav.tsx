import Link from 'next/link';

const MainNav = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex gap-2 items-center'>
        <Link href='/'>Dashboard</Link>
        <Link href='/tickets'>Tickets</Link>
        <Link href='/users'>Users</Link>
      </div>

      <div className='flex gap-2 items-center'>
        <Link href='/'>Logout</Link>
        <Link href='/'>Dark</Link>
      </div>
    </div>
  );
};

export default MainNav;
