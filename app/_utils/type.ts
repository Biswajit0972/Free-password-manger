import {Document, Types} from 'mongoose'

import { House } from "@deemlol/next-icons";
import { AppWindowMac } from "@deemlol/next-icons";
import { LogIn } from "@deemlol/next-icons";
import { FileText, Settings } from "@deemlol/next-icons";
import {Password} from "@/app/_lib/models/password/password.model";


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

export type Account = {
  username: string;
  password: string;
  password_id: string;
  password_iv: string;
  vault_id?: string;
};

export type SiteData = {
  sitename: string;
  vaultId:string,
  accounts: Account[];
};



export type passwordForm  = {
  applicationLink: string;
  username: string;
  password: string;
  masterPassword: string
}

export type EncryptionResponse = {
  _id: string;
  saltDataKey: string;
  saltEnKey: string;
  EnIvKey: string;
  EnIvData: string;
  updatedAt: string;
  __v: number;
};

export interface IVault extends Document {
  userId: Types.ObjectId;
  wrappedVaultKey: string;
  salt: string;
  wrapIv: string
  version: string;
  vaultName: string;
}

export type Encryption ={
  vaultId: string;
  user_id: string;
  username: string;
  password_obj: Password;
  application_link: string;
}
