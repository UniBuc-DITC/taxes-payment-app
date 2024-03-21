'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const lang = pathname?.split('/')[1];

  const createHref = (path: string) => `/${lang}${path}`;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 shadow-lg">
      <div className="container mx-0 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href={createHref(`/admin`)}>
            <p className="text-white font-bold text-xl hover:text-gray-300 transition duration-150 ease-in-out">Home</p>
          </Link>
        </div>

        <button onClick={toggleMenu} className="text-white hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 focus:ring-white">
          <svg className={`h-6 w-6 transition duration-150 ease-in-out ${isOpen && "transform rotate-90"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        <div className={`absolute md:relative top-16 left-0 md:top-0 w-full md:w-auto bg-blue-500 md:bg-transparent transition-all duration-300 ease-in-out ${isOpen ? "flex" : "hidden"} flex-col md:flex-row md:flex space-x-0 md:space-x-4`}>
          <Link href={createHref('/admin/users')}>
            <p className="px-4 py-2 text-white hover:bg-blue-600 md:hover:bg-transparent md:hover:text-gray-300 transition duration-150 ease-in-out">Users</p>
          </Link>
          <Link href={createHref('/admin/dormitories')}>
            <p className="px-4 py-2 text-white hover:bg-blue-600 md:hover:bg-transparent md:hover:text-gray-300 transition duration-150 ease-in-out">Dormitories</p>
          </Link>
          <Link href={createHref('/admin/faculties')}>
            <p className="px-4 py-2 text-white hover:bg-blue-600 md:hover:bg-transparent md:hover:text-gray-300 transition duration-150 ease-in-out">Faculties</p>
          </Link>
          <Link href={createHref('/admin/taxes')}>
            <p className="px-4 py-2 text-white hover:bg-blue-600 md:hover:bg-transparent md:hover:text-gray-300 transition duration-150 ease-in-out">Taxes</p>
          </Link>
          <Link href={createHref('/admin/euplatesc-accounts')}>
            <p className="px-4 py-2 text-white hover:bg-blue-600 md:hover:bg-transparent md:hover:text-gray-300 transition duration-150 ease-in-out">EuPlatesc</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
