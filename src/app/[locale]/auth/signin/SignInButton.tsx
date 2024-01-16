"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

interface Props {
  btn: string;
  callbackError: string;
  otherErros: string;
}

function SignInButton({ btn, callbackError, otherErros }: Props) {
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <div className="m-auto gap-7 flex flex-col items-center justify-center mt-20">
      <button
        onClick={() => {
          signIn("azure-ad");
        }}
      >
        {btn}
      </button>
      {error &&
        (error === "Callback" ? <p>{callbackError}</p> : <p>{otherErros}</p>)}
    </div>
  );
}

export default SignInButton;
