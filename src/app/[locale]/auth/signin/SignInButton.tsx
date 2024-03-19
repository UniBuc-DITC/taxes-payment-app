"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { signIn, signOut } from "next-auth/react";

function SignInButton() { 
  const t = useTranslations("Auth.SignIn");
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <div className="m-auto gap-7 flex flex-col items-center justify-center mt-20">
      <button onClick={() => {signIn("azure-ad")}}>
        {t("buttonLabel")}
      </button>
      <button onClick={() => {signOut()}}>Log out</button>
      {error &&
        (error === "Callback" ? (
          <p>{t("callbackError")}</p>
        ) : (
          <p>{t("otherError")}</p>
        ))}
    </div>
  );
}

export default SignInButton;
