import { getServerSession } from "next-auth";
import SignInButton from "./SignInButton";
import { authOptions } from "@/next-auth-options";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session?.user && (
        <p>
          Azure AD user object ID: <code>{session.user.azureAdObjectId}</code>
        </p>
      )}
      <SignInButton />
    </div>
  );
}
