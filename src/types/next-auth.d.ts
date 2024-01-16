import { DefaultSession, Profile, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      azureAdObjectId: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    azureAdObjectId: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    azureAdObjectId: string;
  }
}
