'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MainNavLinks = ({ role }: { role?: string }) => {
  const currentPath = usePathname();
  const links = [
    { label: 'Dashboard', href: '/', adminOnly: false },
    { label: 'Tickets', href: '/tickets', adminOnly: false },
    { label: 'Users', href: '/users', adminOnly: true },
  ];

  return (
    <div className='flex gap-2 items-center'>
      {links
        .filter((link) => role === 'ADMIN' || !link.adminOnly)
        .map((link) => (
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
