import Navbar from "@/components/navbar";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth-options";
import {
  AuthProvider,
  AuthProviderCallback,
} from "@microsoft/microsoft-graph-client";
import { Client, Options } from "@microsoft/microsoft-graph-client";
import { addAdmin } from "@/actions/actions";

type Params = {
  searchParams: {
    userId: string;
  };
};

let accessToken: string | null = null;

export default async function Page({ searchParams }: Params) {
  const authProvider: AuthProvider = async (callback: AuthProviderCallback) => {
    const clientId = process.env.AZURE_AD_CLIENT_ID;
    const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
    const tokenEndpoint = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;
    try {
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId ?? "",
          client_secret: clientSecret ?? "",
          scope: "https://graph.microsoft.com/.default",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`);
      }

      const data = await response.json();
      accessToken = data.access_token;
      console.log(accessToken);
      callback(null, accessToken);
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  };
  const options: Options = {
    authProvider,
  };
  const client = Client.init(options);
  const userDetails = await client.api(`/users/${searchParams.userId}`).get();

  const getImagePhoto = async () => {
    try {
      const photoResponse = await client
        .api(`users/${searchParams.userId}/photos/96x96/$value`)
        .get();
      const buffer = Buffer.from(await photoResponse.arrayBuffer());
      const imageData = buffer.toString("base64");
      return `data:${photoResponse.type};base64,${imageData}`;
    } catch (err) {
      return null;
    }
  };

  const imagePhoto = await getImagePhoto();

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-indigo-500 mb-4">
              User Details
            </h1>
            {imagePhoto ? (
              <img
                src={imagePhoto}
                alt={userDetails.displayName}
                width={200}
                height={200}
                className="w-32 h-32 rounded-full object-cover border-4 border-black mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-yellow-200 flex items-center justify-center text-black text-5xl  border-4 border-black mb-4">
                {userDetails.givenName.charAt(0).toUpperCase() +
                  userDetails.surname.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col gap-4 justify-center">
              <div className="text-center">
                <p className="text-gray-500">Name: {userDetails.displayName}</p>
                <p className="text-gray-500">
                  Given Name: {userDetails.givenName}
                </p>
                <p className="text-gray-500">Surname: {userDetails.surname}</p>
                <p className="text-gray-500">Email: {userDetails.mail}</p>
                <p className="text-gray-500">
                  User Principal Name: {userDetails.userPrincipalName}
                </p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
