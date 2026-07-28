import Link from "next/link";

const Logo = () => (
  <Link href="/" className="flex items-center gap-2.5" aria-label="FreePassword home">
    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-300 text-lg text-slate-950 shadow-[0_0_22px_rgba(94,234,212,.22)]">⌁</span>
    <span className="hidden text-base font-bold tracking-tight text-white sm:block">Free<span className="text-teal-300">Password</span></span>
  </Link>
);

export default Logo;
