import Navbar from '@/components/navbar';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthProvider, AuthProviderCallback } from '@microsoft/microsoft-graph-client';
import { Client, Options } from '@microsoft/microsoft-graph-client';
import { addAdmin, addTaxesAdmin } from '@/actions/actions';
import Image from 'next/image';
import profile from "../../../../../../public/profile.png"

type Params = {
  searchParams: {
    userId: string;
  };
};

export default async function Page({ searchParams }: Params) {
  const session = await getServerSession(authOptions);
  const authProvider: AuthProvider = (callback: AuthProviderCallback) => {
    callback(null, session?.accessToken ?? null);
  };
  const options: Options = {
    authProvider,
  };
  const client = Client.init(options);
  const userDetails = await client.api(`/users/${searchParams.userId}`).get();
  
  //const photoResponse = await client.api(`users/${searchParams.userId}/photo/$value`).get(); //Blob { size: 28195, type: 'image/jpeg' }
  //const fileURL = URL.createObjectURL(photoResponse); //blob:nodedata:fee57c07-5e03-40df-b230-f2b526e4ca25
  
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-indigo-500 mb-4">User Details</h1>
            <Image
              src={profile}
              alt='/'
              width={200}
              height={200}
              className="w-32 h-32 rounded-full object-cover border-4 border-black mb-4"
            />
            <div className="flex flex-col gap-4 justify-center">
              <div className="text-center">
                <p className="text-gray-500">Name: {userDetails.displayName}</p>
                <p className="text-gray-500">Given Name: {userDetails.givenName}</p>
                <p className="text-gray-500">Surname: {userDetails.surname}</p>
                <p className="text-gray-500">Email: {userDetails.mail}</p>
                <p className="text-gray-500">User Principal Name: {userDetails.userPrincipalName}</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <form action={addAdmin} className="mr-4">
                <input type="hidden" name="userId" value={userDetails.id} />
                <button
                  type="submit"
                  className="p-2 bg-green-500 rounded-full hover:bg-green-600 text-white font-semibold transition duration-300"
                >
                  Add Admin
                </button>
              </form>
              <form action={addTaxesAdmin} >
                <input type="hidden" name="userId" value={userDetails.id} />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 text-white font-semibold transition duration-300"
                >
                  Add Taxes Admin
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
