import { unstable_setRequestLocale } from "next-intl/server";

interface Props {
  params: { locale: string };
}

export default async function TuitionPostUniversitaryPage({
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);
  return <div>TuitionPostUniversitaryPage</div>;
}
