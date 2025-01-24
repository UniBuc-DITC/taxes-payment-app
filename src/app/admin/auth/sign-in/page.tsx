import { Suspense } from "react";
import SignInButton from "./SignInButton";

export default async function SignInPage() {
  return (
    <div>
      <Suspense>
        <SignInButton />
      </Suspense>
    </div>
  );
}
