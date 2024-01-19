import { Link } from "@/navigation";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar() {
  return (
    <div className="bg-blue-400 ">
      <div className="max-w-7xl flex w-full justify-start gap-5 items-center mx-auto">
        <Link href="/">Home</Link>
        <Link href="/admission">Admission</Link>
        <Link href="/tuition">Tuition</Link>
        <Link href="/dorms">Dorms</Link>
        <LocaleSwitcher />
      </div>
    </div>
  );
}
