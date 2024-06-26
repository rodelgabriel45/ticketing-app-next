'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import toast from 'react-hot-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { ticketSchema } from '@/ValidationSchemas/ticket';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Ticket } from '@prisma/client';

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
  ticket?: Ticket;
}

const TicketForm = ({ ticket }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = async (values: z.infer<typeof ticketSchema>) => {
    try {
      setIsSubmitting(true);
      let method = 'POST';
      let url = '/api/tickets';

      if (ticket) {
        method = 'PATCH';
        url = '/api/tickets/' + ticket.id;
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || data);
      }

      toast.success('Ticket Submitted');
      router.push('/tickets');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='rounded-md border p-4 w-full'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            control={form.control}
            name='title'
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Ticket Title...' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            name='description'
            defaultValue={ticket?.description}
            control={form.control}
            render={({ field }) => (
              <SimpleMDE placeholder='Description' {...field} />
            )}
          />
          <div className='flex w-full space-x-4'>
            <FormField
              control={form.control}
              name='status'
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder='Status...'
                          defaultValue={ticket?.status}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='OPEN'>Open</SelectItem>
                      <SelectItem value='STARTED'>Started</SelectItem>
                      <SelectItem value='CLOSED'>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='priority'
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder='Priority...'
                          defaultValue={ticket?.priority}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='LOW'>Low</SelectItem>
                      <SelectItem value='MEDIUM'>Medium</SelectItem>
                      <SelectItem value='HIGH'>High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TicketForm;
