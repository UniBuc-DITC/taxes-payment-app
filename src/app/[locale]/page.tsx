import Image from "next/image";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>PLACEHOLDER UNTIL WE GET THE UI</h1>
      <div>
        <h2>Admission</h2>
        <Link href="/admission/bachelors">Admission bachelors</Link>
        <Link href="/admission/masters">Admission masters</Link>
        <Link href="/admission/doctorate">Admission doctorate</Link>
        <Link href="/admission/postuniversitary">
          Admission postuniversitary
        </Link>
      </div>
      <div>
        <h2>Tuition</h2>
        <Link href="/tuition/bachelors">Tuition bachelors</Link>
        <Link href="/tuition/masters">Tuition masters</Link>
        <Link href="/tuition/doctorate">Tuition doctorate</Link>
        <Link href="/tuition/postuniversitary">Tuition postuniversitary</Link>
      </div>
      <div>
        <h2>Student Dorms</h2>
        <Link href="/studentDorms">Student Dorms</Link>
      </div>
    </main>
  );
}
