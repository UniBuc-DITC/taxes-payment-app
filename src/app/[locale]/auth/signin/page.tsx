import { useTranslations } from "next-intl";
import SignInButton from "./SignInButton";
import { unstable_setRequestLocale } from "next-intl/server";

interface PageProps {
  params: { locale: string };
}

export default function SignInPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);
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
