import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import AzureAD from "next-auth/providers/azure-ad";
import prisma from "@/db/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureAD({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
      authorization: {
        params: {
          // i dont think the redirect link its ok, i cant test it (see whatsup), the docs say to use
          // http://localhost:3000/api/auth/callback/azure-ad
          // if i use it next-auth doesnt work 
          //   redirect_uri: "http://localhost:3000/api/auth/microsoft365",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          azureAdObjectId: profile.oid,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? null,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      //   const dbUser = await prisma.user.findUnique({
      //     where: { azureAdObjectId: user.azureAdObjectId },
      //   });
      //   if (dbUser) {
      //     return true;
      //   }
      //   return false;

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
      }
      if (user) {
        token.azureAdObjectId = user.azureAdObjectId;
      }

      return token;
    },
    session({ session, token }) {
      if (token.accessToken && typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }
      if (token.azureAdObjectId && typeof token.azureAdObjectId === "string") {
        session.user.azureAdObjectId = token.azureAdObjectId;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
