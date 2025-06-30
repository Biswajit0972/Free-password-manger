import { House } from "@deemlol/next-icons";
import { AppWindowMac } from "@deemlol/next-icons";
import { Settings } from "@deemlol/next-icons";
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
    icon: Settings ,
  },
];