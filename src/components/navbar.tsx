"use client";

import React from "react";

import Link from "next/link";
import { signOut } from "next-auth/react";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white relative flex items-center justify-between px-4 py-2">
      <Link href="/admin">
        <span className="font-bold text-xl">Home</span>
      </Link>
      <button onClick={() => signOut()}>
        <span className="font-bold text-sm">Sign out</span>
      </button>
    </nav>
  );
}

export default Navbar;
