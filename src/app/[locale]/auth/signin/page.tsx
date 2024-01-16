import { useTranslations } from "next-intl";
import SignInButton from "./SignInButton";

export default function SignInPage() {
  const t = useTranslations("Auth.SignIn");

  return (
    <div>
      <SignInButton
        btn={t("btn")}
        callbackError={t("callbackError")}
        otherErros={t("otherErros")}
      />
    </div>
  );
}
