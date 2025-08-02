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
    href: "/settings/user-profile",
    icon: Settings,
  },
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

export type User = {
  username: string;
  password: string;
};

export const fakeUsers: User[] = [
  { username: "john_doe", password: "password123" },
  { username: "alice_w", password: "alice@2024" },
  { username: "tech_guru", password: "securePass!" },
  { username: "dev_biswajit", password: "biswajitDev99" },
  { username: "cool_cat", password: "meowMeow88" },
  { username: "hacker_007", password: "qwerty007" },
  { username: "admin_user", password: "admin$admin" },
  { username: "test_user", password: "test1234" },
  { username: "ninja_dev", password: "codeMaster99" },
  { username: "user_xyz", password: "helloWorld123" },
];

type Account = {
  username: string;
  password: string;
};

type SiteData = {
  sitename: string;
  icon: string;
  account: Account[];
};

export const fakeData: SiteData[] = [
  {
    sitename: "google.com",
    icon: "https://www.google.com/favicon.ico",
    account: [
      { username: "john.doe@gmail.com", password: "g00gl3Pa$$123" },
      { username: "jane.smith@gmail.com", password: "P@ssword456!" }
    ]
  },
  {
    sitename: "facebook.com",
    icon: "https://www.facebook.com/favicon.ico",
    account: [
      { username: "john_facebook", password: "Fb@123456" },
      { username: "jane_facebook", password: "FbP@ss789!" }
    ]
  },
  {
    sitename: "twitter.com",
    icon: "https://twitter.com/favicon.ico",
    account: [
      { username: "john_twt", password: "Tw1tter@098" },
      { username: "jane_tw", password: "JaneTwt#321" }
    ]
  },
  {
    sitename: "github.com",
    icon: "https://github.com/favicon.ico",
    account: [
      { username: "john-dev", password: "G!thub123" },
      { username: "jane-code", password: "Code#Hub321" }
    ]
  },
  {
    sitename: "linkedin.com",
    icon: "https://www.linkedin.com/favicon.ico",
    account: [
      { username: "john.business", password: "L!nkedIn789" },
      { username: "jane.career", password: "JanePro456!" }
    ]
  }
];

export type passwordForm  = {
  applicationLink: string;
  username: string;
  password: string;
}

export type EncryptionResponse = {
  statusCode: number;
  message: string;
  data: {
    _id: string;
    saltDataKey: string;
    saltEnKey: string;
    EnIvKey: string;
    EnIvData: string;
    updatedAt: string;
    __v: number;
  };
  status: string;
};