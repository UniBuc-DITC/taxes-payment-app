import Navbar from "@/components/navbar";
import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth-options";
import { AuthProvider, AuthProviderCallback } from "@microsoft/microsoft-graph-client";
import { Client, Options } from "@microsoft/microsoft-graph-client";
import SearchBar from "./SearchBar";
import { FaTrash } from "react-icons/fa";
import { deleteAdmin } from "@/actions/actions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const authProvider: AuthProvider = (callback: AuthProviderCallback) => {
    callback(null, session?.accessToken ?? null);
  };
  const options: Options = {
    authProvider,
  };
  const client = Client.init(options);

  const users = await prisma.user.findMany();
  const userCards = [];
  for (const user of users) {
    let userDetails = await client.api(`/users/${user.azureAdObjectId}`).get();
    userDetails.role = user.role;
    userCards.push(
      <div key={userDetails.id} className="relative max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
        <form action={deleteAdmin} method="post" className="absolute top-0 right-0 m-4">
          <input type="hidden" name="userId" value={userDetails.id} />
          <button type="submit" className="p-2 bg-red-500 rounded-full hover:bg-red-600 inline-flex items-center justify-center">
            <FaTrash className="text-white text-2xl" />
          </button>
        </form>
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Name: {userDetails.displayName}</div>
            <p className="mt-2 text-gray-500">Job title: {userDetails.jobTitle}</p>
            <p className="mt-2 text-gray-500">Mail: {userDetails.mail}</p>
            <p className="mt-2 text-gray-500">Phone number: {userDetails.mobilePhone ?? 'No provided number'}</p>
            <p className="mt-2 text-gray-500">Role: {userDetails.role}</p>
          </div>
        </div>
      </div>
    );
  }

   
  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen p-24">
        <div className="flex-1 mr-8">
          <div className="mb-8">{userCards}</div>
        </div>
        <div className="w-96">
          <SearchBar />
        </div>
      </main>
    </div>
  );

}
