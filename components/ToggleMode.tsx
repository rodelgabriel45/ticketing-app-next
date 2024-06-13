'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant='outline' size='icon' disabled>
        <Sun className='hover:cursor-pointer hover:text-primary' />
      </Button>
    );
  }

  const dark = theme === 'dark';

  return (
    <Button
      onClick={() => setTheme(`${dark ? 'light' : 'dark'}`)}
      variant='outline'
      size='icon'
    >
      {dark ? (
        <Sun className='hover:cursor-pointer hover:text-primary' />
      ) : (
        <Moon className='hover:cursor-pointer hover:text-primary' />
      )}
    </Button>
  );
};

export default ToggleMode;
