import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Tienda maquillaje",
      credentials: {
        usuario: { label: "usuario", type: "text" },
        contrasena: { label: "contrasena", type: "password" },
      },
      // first
      async authorize(credentials) {
        const usuario = credentials?.usuario;
        const contrasena = credentials?.contrasena;

        if (!usuario && !contrasena) {
          return Promise.resolve(null);
        }

        const login = await prisma.login.findFirst({
          where: {
            usuario,
          },
        });

        if (!login) {
          return Promise.resolve(null);
        }

        const passwordOk =
          login && bcrypt.compareSync(contrasena!, login.contrasena);

        if (passwordOk) {
          return Promise.resolve(login as any);
        }
        return Promise.resolve(null);
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      try {
        // const userRes = await prisma.login.findFirst({
        //   where: {
        //     usuario: user.usuario,
        //   },
        // });

        if (user) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    // second
    async jwt({ token, user }: any) {
      const login = await prisma.login.findFirst({
        where: {
          id: user ? user.id : token.id,
        },
        include: {
          empleado: {
            select: {
              nombre: true,
              apellido: true,
              rol: true,
            },
          },
        },
      });

      if (!login) {
        return token;
      }

      const jwt = {
        id: login?.id || 0,
        usuario: login?.usuario || "",
        nombre: `${login.empleado?.nombre} ${login.empleado?.apellido}`,
        rol: login.empleado.rol,
        ...token,
      };
      return jwt;
    },
    // third
    async session({ session, token }: any) {
      const { picture, ...user } = token;
      session.user = {
        id: user?.id,
        usuario: user?.usuario,
        rol: user?.rol,
        nombre: user?.nombre,
      };
      return Promise.resolve(session);
    },
  },
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, //24 hours
  },
  // useSecureCookies: true,
};

// export async function isAdmin() {
//   const session = await getServerSession(authOptions);
//   return true;
//   const userEmail = session?.user?.email;
//   console.log({ session });
//   if (!userEmail) {
//     return false;
//   }
//   const user = await User.findOne({ email: userEmail });
//   if (!user) {
//     return false;
//   }
//   return user.role === "admin";
// }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
