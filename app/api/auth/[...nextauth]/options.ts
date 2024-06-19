import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

import prisma from '@/prisma/db';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'password',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'Username...',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password...',
        },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { username: credentials!.username },
        });

        if (!user) {
          return null;
        }

        const match = await bcryptjs.compare(
          credentials!.password,
          user.password
        );

        if (!match) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || 'USER';
      }
      return session;
    },
  },
};

export default options;
