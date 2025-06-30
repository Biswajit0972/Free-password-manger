"use client";

import React from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { navItems } from "../_utils";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Navbar = () => {
   const pathname = usePathname();
   
  return (
    <div className="w-full h-18 bg-gray-500 px-5 py-2 relative flex-between ">
      <Logo />
      <nav className="hidden sm:flex items-center gap-5">
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`text-white  flex-center gap-2 group ${pathname === item.href ? "text-green-500 font-bold" : ""
              }`}
            title={item.title}
          >
            <item.icon
              size={20}
              className="group-hover:text-green-400 transition-all duration-300"
            />
            <p className="text-sm group-hover:text-green-400 transition-all duration-300">
              {item.title}
            </p>
          </Link>
        ))}
      </nav>
      <div className="h-full relative sm:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
