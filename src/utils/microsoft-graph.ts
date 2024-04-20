/**
 * Retrieves an access token from Microsoft Entra ID, using the application credentials
 * and the resource owner flow.
 */
export async function getAccessToken() {
  const clientId = process.env.AZURE_AD_CLIENT_ID;
  const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
  const tokenEndpoint = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId ?? "",
      client_secret: clientSecret ?? "",
      scope: "https://graph.microsoft.com/.default",
    }),
    // Ensure the fetched token is revalidated at least once every 30 minutes,
    // to avoid errors due to stale values in the Next.js data cache.
    //
    // See also https://nextjs.org/docs/app/building-your-application/caching#fetch-optionscache
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}
