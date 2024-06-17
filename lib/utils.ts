import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  {
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
};
