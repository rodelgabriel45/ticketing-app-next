'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { User } from '@prisma/client';
import { userSchema } from '@/ValidationSchemas/users';

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      setIsSubmitting(true);
      let method = 'POST';
      let url = '/api/users';

      if (user) {
        method = 'PATCH';
        url = '/api/users/' + user.id;
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
        throw new Error(data.message || data);
      }

      toast.success(
        user ? 'User Updated Successfully' : 'Account Created Successfully'
      );
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
            name='name'
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Users Full Name...' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Username...' {...field} required />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            defaultValue=''
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter Password...'
                    {...field}
                    required={user ? false : true}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className='flex w-full space-x-4'>
            <FormField
              control={form.control}
              name='role'
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder='Role...'
                          defaultValue={user?.role}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='USER'>User</SelectItem>
                      <SelectItem value='TECH'>Tech</SelectItem>
                      <SelectItem value='ADMIN'>Admin</SelectItem>
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

export default UserForm;
