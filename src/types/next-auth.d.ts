import { DefaultSession, Profile, JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      entraIdObjectId: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    entraIdObjectId: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    entraIdObjectId: string;
  }
}
