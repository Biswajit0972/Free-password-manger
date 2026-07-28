"use client";

import { useMemo, useState } from "react";
import { passwordStrengthCheckHelper } from "../_utils/functions";

const strengthStyles = {
  Undetermined: "bg-slate-600 text-slate-300",
  "Very Weak": "bg-red-400 text-red-200",
  Weak: "bg-orange-400 text-orange-200",
  Fair: "bg-amber-300 text-amber-100",
  Good: "bg-lime-300 text-lime-100",
  Strong: "bg-teal-300 text-teal-100",
  "Very Strong": "bg-teal-200 text-teal-100",
  Excellent: "bg-emerald-300 text-emerald-100",
} as const;

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const strength = useMemo(() => passwordStrengthCheckHelper(password), [password]);
  const width = { Undetermined: "0%", "Very Weak": "16%", Weak: "30%", Fair: "45%", Good: "60%", Strong: "75%", "Very Strong": "88%", Excellent: "100%" }[strength];

  return (
    <section className="rounded-3xl border border-white/10 bg-[#101621] p-6 shadow-2xl shadow-black/20 sm:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-sm font-semibold tracking-[.14em] text-teal-300">STRENGTH CHECKER</p><h2 className="mt-2 text-2xl font-bold text-white">Test a password privately</h2><p className="mt-2 max-w-xl text-base leading-7 text-slate-400">Your password is checked only in this browser. Nothing is stored, logged, or sent anywhere.</p></div><span className="rounded-full border border-teal-300/15 bg-teal-300/[.07] px-3 py-1.5 text-sm font-medium text-teal-200">Local only</span></div>
      <div className="mt-7 rounded-2xl border border-white/10 bg-[#080c14] p-3 sm:p-4"><label htmlFor="strength-checker" className="mb-2 block text-sm font-medium text-slate-300">Enter a password to check</label><input id="strength-checker" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Type a password here…" className="h-12 w-full rounded-xl border border-white/10 bg-white/[.035] px-4 text-base text-slate-100 outline-none placeholder:text-slate-600 focus:border-teal-300/50" autoComplete="new-password" /><div className="mt-5 flex items-center justify-between gap-4"><span className="text-sm text-slate-400">Strength</span><span className="text-sm font-bold text-slate-100">{strength}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full transition-all duration-300 ${strengthStyles[strength]}`} style={{ width }} /></div></div>
      <p className="mt-4 text-sm leading-6 text-slate-500">Tip: use at least 16 characters and avoid common words, repeating characters, and predictable sequences.</p>
    </section>
  );
};

export default PasswordStrengthChecker;
