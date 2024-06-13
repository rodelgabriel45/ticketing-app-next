'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Tickets', href: '/tickets' },
    { label: 'Users', href: '/users' },
  ];

  return (
    <div className='flex gap-2 items-center'>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={`navbar-link ${
            currentPath === link.href && 'cursor-default text-primary'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;
