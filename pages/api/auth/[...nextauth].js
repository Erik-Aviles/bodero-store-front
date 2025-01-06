import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Customer } from "@/models/schemas/Customer";
import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password", placeholder: "example",},
      },
      async authorize(credentials, req) {
         await mongooseConnect();
        console.log(credentials);
        if (!credentials.email || !credentials.password) {
          throw new Error("Por favor ingrese un correo y una contraseña");
        }
        const userFind = await Customer.findOne({ email: credentials.email }).select('+password');

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
        console.log(userFind);

        return userFind;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, profile, session }) {
      console.log("jwt", token, user, profile, session);
      if (user) token.user = user;
      return token;
    },
    session({ session, token, user }) {
      console.log("session", token, user, session);

      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/inicio-sesion",
  }
};
export default NextAuth(authOptions);