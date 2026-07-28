"use client";

import Logo from "./Logo";
import Navigation from "./Navigation";
import {authNavItems, navItems} from "../_utils/type";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {UserButton, useUser} from "@clerk/nextjs";


const Navbar = () => {
    const pathname = usePathname();
    const {isLoaded, isSignedIn} = useUser();

    return (
        <header className="sticky top-0 z-30 border-b border-white/[.07] bg-[#080b12]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
                <Logo/>
                {
                    isLoaded && isSignedIn ? ( <Navigation data={navItems} render={(item) => (
                        <Link href={item.href} key={item.href}
                              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition sm:px-3 ${pathname === item.href ? "bg-teal-300/10 font-semibold text-teal-200" : "text-slate-400 hover:bg-white/[.05] hover:text-slate-100"}`}
                              title={item.title}>
                            <item.icon size={17}/>
                            <span className="hidden sm:inline">{item.title}</span>
                        </Link>
                    )}/>) : (<Navigation
                        data={authNavItems}
                        render={(item) => {
                            return (
                                <Link
                                    href={item.href}
                                    key={item.title}
                                    className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition sm:px-3 ${pathname === item.href ? "bg-teal-300/10 font-semibold text-teal-200" : "text-slate-400 hover:bg-white/[.05] hover:text-slate-100"}`}
                                    title={item.title}
                                    aria-label={item.title}
                                >
                                    <item.icon
                                        size={17}
                                    />
                                    <span className="hidden sm:inline">{item.title}</span>
                                </Link>
                            );
                        }}
                    />)
                }
                {isLoaded && isSignedIn && (
                    <div className="h-8 w-8 bg-green-500 rounded-full flex-center ">
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-8 h-8",
                                    userButtonAvatarImage: "w-8 h-8 rounded-full",
                                    userButtonAction: "hidden",
                                },
                            }}
                        />
                    </div>
                )}
            </div>

        </header>
    );
};

export default Navbar;
