import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/models/userModel';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error('No user found');

        const isValid = await bcrypt.compare(
          credentials?.password || '',
          user.password
        );

        if (!isValid) throw new Error('Invalid password');

        return { id: user._id, email: user.email, name: user.name };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/login'
  }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };