"use client";

import React from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { UserButton, useUser } from "@clerk/nextjs";
import Navigation from "./Navigation";
import { authNavItems, navItems } from "../_utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  //  ! check user session and render navigation items based on user authentication status
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className="w-full h-18 bg-gray-500  px-5 py-2 relative flex-between">
      <Logo />
      {/* !  Navigation Items */}
      <div className="hidden h-full md:max-w-[58%]  relative md:flex overflow-hidden">
        <div className="h-full  w-full  relative flex-between gap-3">
          {isLoaded && isSignedIn ? (
            <Navigation
              data={navItems}
              render={(item) => {
                return (
                  <Link
                    href={item.href}
                    key={item.href}
                    className={`text-white  flex-center gap-2 group ${
                      pathname === item.href ? "text-green-500 font-bold" : ""
                    }`}
                    title={item.title}
                  >
                    <item.icon
                      size={20}
                      className={`  flex-center gap-2 group ${
                        pathname === item.href ? "text-green-500 font-bold" : ""
                      } group-hover:text-green-400 transition-all duration-300`}
                    />
                    <p className="text-sm group-hover:text-green-400 transition-all duration-300">
                      {item.title}
                    </p>
                  </Link>
                );
              }}
            />
          ) : (
            <Navigation
              data={authNavItems}
              render={(item) => {
                return (
                  <Link
                    href={item.href}
                    key={item.title}
                    className={`text-white  flex-center gap-2 group ${
                      pathname === item.href ? "text-green-500 font-bold" : ""
                    }`}
                    title={item.title}
                  >
                    <item.icon
                      size={20}
                      className={`  flex-center gap-2 group ${
                        pathname === item.href ? "text-green-500 " : ""
                      } group-hover:text-green-400 transition-all duration-300`}
                    />
                    <p className="text-sm font-bold group-hover:text-green-400 transition-all duration-300">
                      {item.title}
                    </p>
                  </Link>
                );
              }}
            />
          )}
          {isLoaded && isSignedIn && (
            <div className="h-10 w-10 bg-green-500 rounded-full flex-center ">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10",
                    userButtonAvatarImage: "w-10 h-10 rounded-full",
                    userButtonAction: "hidden",
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* !  Mobile Menu */}
      <div className="h-full relative md:hidden">
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
