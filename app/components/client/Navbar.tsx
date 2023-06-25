"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const currentRoute = usePathname();
  return (
    <nav className="h-[7vh] w-full   bg-lawrencium text-white flex justify-center items-center px-4 md:px-12 lg:px-24">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-center items-center">
          TodoApp
          <img src="/images/logo.png" alt="Logo" className="w-8 ml-2 h-8" />
        </div>
        <div className="flex justify-even items-center gap-3">
          <Link
            className={`${
              currentRoute == "/" ? "border-b-2 border-yellow-300" : ""
            }`}
            href="/"
          >
            Home
          </Link>

          <Link
            className={`${
              currentRoute == "/classic" ? "border-b-2 border-yellow-300" : ""
            }`}
            href="/classic"
          >
            Classic
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
