import { House } from "@deemlol/next-icons";
import { AppWindowMac } from "@deemlol/next-icons";
import { LogIn } from "@deemlol/next-icons";
import { FileText, Settings } from "@deemlol/next-icons";

type navItem = {
  title: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
};

export const navItems: navItem[] = [
  {
    title: "Home",
    href: "/",
    icon: House,
  },
  {
    title: "Password Manager",
    href: "/password",
    icon: AppWindowMac,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  }
];

export const authNavItems: navItem[] = [
    {
    title: "Home",
    href: "/",
    icon: House,
  },
  
  {
    title: "Sign In",
    href: "/sign-in",
    icon:  LogIn,
  },
   {
    title: "Sign Up",
    href: "/sign-up",
    icon: FileText,
   }
]