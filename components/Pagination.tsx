'use client';

import { Button } from '@/components/ui/button';

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  itemCount: number;
  page_size: number;
  currentPage: number;
}

const Pagination = ({ itemCount, page_size, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / page_size);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <div className='flex flex-col gap-2 mt-5'>
      <div className='flex items-center gap-1'>
        <Button
          variant='outline'
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant='outline'
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant='outline'
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          variant='outline'
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <ChevronLast />
        </Button>
      </div>

      <div>
        <p>
          Page {currentPage} of {pageCount}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
