import Navbar from "@/components/navbar";
import Link from "next/link";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

const NavItem: React.FC<NavItemProps> = ({ href, children }) => (
  <li>
    <Link href={href}>
      <p className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors">
        {children}
      </p>
    </Link>
  </li>
);

const Home: React.FC = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <h1 className="text-center text-3xl font-bold mt-8 mb-4">Welcome!</h1>
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Management</h2>
      <ul className="space-y-2">
        <NavItem href="/admin/users">Users</NavItem>
        <NavItem href="/admin/dormitories">Dormitories</NavItem>
        <NavItem href="/admin/faculties">Faculties</NavItem>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Finance</h2>
      <ul className="space-y-2">
        <NavItem href="/admin/taxes">Taxes</NavItem>
        <NavItem href="/admin/euplatesc-accounts">Euplatesc Accounts</NavItem>
        <NavItem href="/admin/transactions">Transactions</NavItem>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Settings</h2>
      <ul className="space-y-2">
        <NavItem href="/admin/settings">Settings</NavItem>
      </ul>
    </div>
  </div>
);

export default Home;
