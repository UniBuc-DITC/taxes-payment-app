import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Link } from "@/navigation";

type PageProps = {
  params: {
    locale: string;
  };
};

export default function Home({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("Index");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>PLACEHOLDER UNTIL WE GET THE UI</h1>
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">Admission</h2>
        <Link href="/admission-tax/bachelors">Admission bachelors</Link>
        <Link href="/admission-tax/masters">Admission masters</Link>
        <Link href="/admission-tax/doctorate">Admission doctorate</Link>
        <Link href="/admission-tax/postgraduate">Admission postgraduate</Link>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">Tuition</h2>
        <Link href="/tuition-tax/bachelors">Tuition bachelors</Link>
        <Link href="/tuition-tax/masters">Tuition masters</Link>
        <Link href="/tuition-tax/doctorate">Tuition doctorate</Link>
        <Link href="/tuition-tax/postgraduate">Tuition postgraduate</Link>
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">Student Dorms</h2>
        <Link href="/accommodation-tax">Student Dorms</Link>
      </div>
    </main>
  );
}
