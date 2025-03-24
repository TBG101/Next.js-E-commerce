import dbConnect from "./dbConnect";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { userModel } from "@/models/userModel";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await userModel.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(
          credentials?.password || "",
          user.password,
        );

        if (!isValid) throw new Error("Invalid password");
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.shouldUpdateUser = Date.now() + 60 * 30 * 1000;
      }
      if (token.shouldUpdateUser < Date.now()) {
        await dbConnect();
        const user = await userModel.findById(token.id);
        if (!user) return token;
        token.role = user.role;
        token.name;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
