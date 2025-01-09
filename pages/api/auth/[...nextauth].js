import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Customer } from "@/models/schemas/Customer";
import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "example",
        },
      },
      async authorize(credentials, req) {
        await mongooseConnect();
        if (!credentials.email || !credentials.password) {
          throw new Error("Por favor ingrese un correo y una contraseña");
        }
        const userFind = await Customer.findOne({
          email: credentials.email,
        }).select("+password");

        if (!userFind) {
          throw new Error("Usuario no registrado");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          userFind.password
        );

        if (!passwordMatch) {
          throw new Error("Contraseña incorrecta");
        }
        return userFind;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account}) {
      if (account.provider === "credentials") {
        return true;
      }
    },
    jwt({ token, user, trigger, session }) {

      if (trigger === "update" && session) {
        token.user = session.user;
      }

      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/inicio-sesion",
  },
};
export default NextAuth(authOptions);
