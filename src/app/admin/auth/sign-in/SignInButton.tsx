"use client";

import { useSearchParams } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

function SignInButton() {
  const session = useSession();
  const loggedIn = session.status === "authenticated";

  const params = useSearchParams();
  const error = params.get("error");
  return (
    <div className="m-auto gap-7 flex flex-col items-center justify-center mt-20">
      <button
        onClick={() => {
          signIn("azure-ad");
        }}
      >
        Conectare
      </button>
      {loggedIn && (
        <button
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </button>
      )}
      {error &&
        (error === "Callback" ? (
          <p>
            Doar utilizatorii autorizați au permisiunea de a se conecta la
            interfața de administrare a aplicației
          </p>
        ) : (
          <p>Hopa, ceva nu a funcționat corect :(</p>
        ))}
    </div>
  );
}

export default SignInButton;
