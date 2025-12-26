import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import AzureAD from "next-auth/providers/azure-ad";
import type { Provider } from "next-auth/providers/index";
import prisma from "@/lib/prisma";
import { Role } from "./generated/prisma/enums";

const providers: Provider[] = [];

const tenantId = process.env.ENTRA_ID_TENANT_ID;
if (typeof tenantId !== "string" || !tenantId) {
  throw Error(
    "Required environment variable `ENTRA_ID_TENANT_ID` is not defined",
  );
}

const clientId = process.env.ENTRA_ID_CLIENT_ID;
if (typeof clientId !== "string" || !clientId) {
  throw Error(
    "Required environment variable `ENTRA_ID_CLIENT_ID` is not defined",
  );
}

let clientSecret = process.env.ENTRA_ID_CLIENT_SECRET;
if (typeof clientSecret !== "string" || !clientSecret) {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    // During build, we don't need to know the client secret
    clientSecret = "";
  } else {
    throw Error(
      "Required environment variable `ENTRA_ID_CLIENT_SECRET` is not defined",
    );
  }
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
        entraIdObjectId: profile.oid,
        name: profile.name,
        email: profile.email,
        image: profile.picture ?? null,
      };
    },
  }),
);

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  callbacks: {
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          entraIdObjectId: user.entraIdObjectId,
        },
      });

      if (dbUser) return true;

      return false;
    },

    async jwt({ token, user, account, trigger, session }) {
      if (!user) {
        throw new Error("User profile data is missing");
      }

      const dbUser = await prisma.user.findUnique({
        where: {
          entraIdObjectId: user.entraIdObjectId,
        },
      });

      if (!dbUser) {
        throw new Error(
          `Could not find user with Entra object ID '${user.entraIdObjectId}' in database`,
        );
      }

      if (!account || account.access_token === undefined) {
        throw new Error("Account data or access token are missing");
      }

      token.accessToken = account.access_token;
      token.refreshToken = account.refresh_token;

      token.entraIdObjectId = user.entraIdObjectId;
      token.role = Role.AppAdmin;

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? baseUrl + "/admin" : url;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.entraIdObjectId = token.entraIdObjectId;
      session.user.role = token.role;

      return session;
    },
  },
  pages: {
    signIn: "/admin/auth/sign-in",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
