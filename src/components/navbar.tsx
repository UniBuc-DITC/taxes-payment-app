'use client'

import React, { useState } from 'react';
import Link from 'next/link';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white relative flex items-center justify-between px-4 py-2">
      
      <Link href="/admin">
           <span className="font-bold text-xl">Home</span>
      </Link>
      <button
        className="dropdown-toggle text-white focus:outline-none px-3 py-2 rounded-md hover:bg-gray-700"
        type="button"
        onClick={toggleDropdown}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      <ul className={`dropdown-menu absolute bg-gray-700 text-white rounded shadow-md py-1 w-48 z-50 ${isOpen ? '' : 'hidden'}`} style={{ top: 'calc(100% + 5px)', right: '0' }}
      >
        <li>
          <Link href="/admin/users">
            <p className="dropdown-item block px-4 py-2 hover:bg-gray-600">Useri</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/dormitories">
            <p className="dropdown-item block px-4 py-2 hover:bg-gray-600">Camine</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/faculties">
            <p className="dropdown-item block px-4 py-2 hover:bg-gray-600">Facultati</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/taxes">
            <p className="dropdown-item block px-4 py-2 hover:bg-gray-600">Taxe</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/euplatesc-accounts">
            <p className="dropdown-item block px-4 py-2 hover:bg-gray-600">Conturi</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/transactions">
            <p className="dropdown-item block px-4 py-2 hover:bg-gray-600">Tranzactii</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
