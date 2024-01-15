"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

function SinginPage() {
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <div className="m-auto space-y-7 flex items-center justify-center mt-20">
      <button
        onClick={() => {
          signIn("azure-ad");
        }}
      >
        Sing in
      </button>
      {error &&
        (error === "Callback" ? (
          <p>
            Please make sure you have access, if you requested access talk to
            the admin
          </p>
        ) : (
          <p>Ooops, something went wrong :(</p>
        ))}
    </div>
  );
}

export default SinginPage;
