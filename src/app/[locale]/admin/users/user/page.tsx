import Navbar from '@/components/navbar'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthProvider, AuthProviderCallback } from "@microsoft/microsoft-graph-client";
import { Client, Options } from "@microsoft/microsoft-graph-client";
import { addAdmin } from '@/actions/actions';

type Params = {
  searchParams: {
    userId: string;
  };
};


export default async function page({searchParams} : Params) {
  const session = await getServerSession(authOptions);
  const authProvider: AuthProvider = (callback: AuthProviderCallback) => {
    callback(null, session?.accessToken ?? null);
  };
  const options: Options = {
    authProvider,
  };
  const client = Client.init(options);
  let userDetails = await client.api(`/users/${searchParams.userId}`).get();

  return (
    <div>
        <Navbar />
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Name: {userDetails.displayName}
            </div>
            <p className="mt-2 text-gray-500">
              Given Name: {userDetails.givenName}
            </p>
            <p className="mt-2 text-gray-500">
              Surname: {userDetails.surname}
            </p>
            <p className="mt-2 text-gray-500">Email: {userDetails.mail}</p>
            <p className="mt-2 text-gray-500">
              User Principal Name: {userDetails.userPrincipalName}
            </p>
            <form action={addAdmin} method="post">
                <input type="hidden" name="userId" value={userDetails.id} />
                <button type="submit" className="p-2 bg-green-500 rounded-full hover:bg-green-600 inline-flex items-center justify-center">
                Add Admin
                </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
