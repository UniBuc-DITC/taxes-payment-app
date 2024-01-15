import { DefaultSession, Profile } from "next-auth";

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
