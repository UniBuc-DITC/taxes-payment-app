import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Taxes Payment App</h1>
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
