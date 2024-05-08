import msal from "@azure/msal-node";
import {
  AuthProvider,
  AuthProviderCallback,
  Client,
} from "@microsoft/microsoft-graph-client";
import { PrismaClient, Role } from "@prisma/client";
import { createInterface as readlineCreateInterface } from "readline";
import { stdin as input, stdout as output } from "process";

const MICROSOFT_GRAPH_ENDPOINT = "https://graph.microsoft.com/";

async function acquireAccessToken() {
  const tenantId = process.env.AZURE_AD_TENANT_ID;
  const clientId = process.env.AZURE_AD_CLIENT_ID;
  const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;

  if (!tenantId) {
    throw Error("Entra ID tenant ID is missing");
  }

  if (!clientId) {
    throw Error("Entra ID client ID is missing");
  }

  if (!clientSecret) {
    throw Error("Entra ID client secret is missing");
  }

  const msalConfig = {
    auth: {
      authority: `https://login.microsoftonline.com/${tenantId}`,
      clientId,
      clientSecret,
    },
  };

  const tokenRequest = {
    scopes: [`${MICROSOFT_GRAPH_ENDPOINT}/.default`],
  };

  const cca = new msal.ConfidentialClientApplication(msalConfig);

  return await cca.acquireTokenByClientCredential(tokenRequest);
}

const prisma = new PrismaClient();

async function main() {
  const authenticationResult = await acquireAccessToken();
  if (!authenticationResult) {
    throw Error("Failed to acquire access token for MSAL API");
  }

  const { accessToken } = authenticationResult;

  const rl = readlineCreateInterface({ input, output });

  rl.question(
    "New admin user institutional e-mail address: ",
    async (email: string) => {
      const authProvider: AuthProvider = async (
        callback: AuthProviderCallback,
      ) => callback(null, accessToken);

      const client = Client.init({ authProvider });

      let userInfo;
      try {
        userInfo = await client
          .api(`/users/${email}?$select=id,displayName`)
          .get();
      } catch (exception) {
        throw new Error(
          `Failed to get user data from Microsoft 365: ${exception}`,
        );
      }

      if (!userInfo || !userInfo["id"]) {
        throw new Error("User with given e-mail address could not be found");
      }

      try {
        const newUser = await prisma.user.create({
          data: {
            azureAdObjectId: userInfo["id"],
            role: Role.appAdmin,
          },
        });

        console.log(
          `Successfully created admin account associated to user with ID ${newUser.azureAdObjectId}, full name ${userInfo["displayName"]}`,
        );
      } catch (exception) {
        console.error(`Failed to create user in database: ${exception}`);
      }

      rl.close();
    },
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
