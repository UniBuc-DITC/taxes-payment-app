import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import AzureAD from "next-auth/providers/azure-ad";
import type { Provider } from "next-auth/providers/index";
// import prisma from "@/db/prisma";

const providers: Provider[] = [];

const tenantId = process.env.AZURE_AD_TENANT_ID;
if (typeof tenantId !== "string" || !tenantId) {
  throw Error(
    "Required environment variable `AZURE_AD_TENANT_ID` is not defined",
  );
}

const clientId = process.env.AZURE_AD_CLIENT_ID;
if (typeof clientId !== "string" || !clientId) {
  throw Error(
    "Required environment variable `AZURE_AD_CLIENT_ID` is not defined",
  );
}

const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
if (typeof clientSecret !== "string" || !clientSecret) {
  throw Error(
    "Required environment variable `AZURE_AD_CLIENT_SECRET` is not defined",
  );
}

providers.push(
  AzureAD({
    tenantId,
    clientId,
    clientSecret,
    authorization: {
      params: {},
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
);

export const authOptions: NextAuthOptions = {
  providers,

  callbacks: {
    async signIn({ user }) {
      // waiting for prisma to be added just a prof of concept
      //   const dbUser = await prisma.user.findUnique({
      //     where: { azureAdObjectId: user.azureAdObjectId },
      //   });
      //   if (dbUser) {
      //     return true;
      //   }
      //   return false;

      return true;
    },
    jwt({ token, user, account }) {
      if (!account) {
        throw new Error("Cannot create JWT, received account object is null");
      }

      if (!account.access_token) {
        throw new Error("Access token was not present in account object");
      }

      token.accessToken = account.access_token;
      token.azureAdObjectId = user.azureAdObjectId;

      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.azureAdObjectId = token.azureAdObjectId;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
