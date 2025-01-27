import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import { compare } from 'bcryptjs';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Identifiant", type: "text" },
        password: { label: "Mot de passe", type: "password" },
        position: { label: "Position", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password || !credentials?.position) {
          throw new Error('Veuillez remplir tous les champs');
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
            position: credentials.position
          }
        });

        if (!user) {
          throw new Error('Utilisateur non trouvé');
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error('Mot de passe incorrect');
        }

        return {
          id: user.id,
          username: user.username,
          position: user.position
        };
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.position = user.position;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.position = token.position;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };