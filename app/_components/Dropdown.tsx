"use client";

import Image from "next/image";
import {useState} from "react";
import {ChevronDown} from "@deemlol/next-icons";
import {SiteData} from "../_utils/type";
import PasswordRender from "./PasswordRender";
import CustomUl from "./CustomUl";

const Dropdown = ({data}: { data: SiteData }) => {
    const [isOpen, setIsOpen] = useState(false);

    const site = data.sitename.split("/").filter(Boolean).pop() || data.sitename;

    return (
        <section
            className="overflow-hidden rounded-2xl border border-white/8 bg-[#0b1019] transition hover:border-white/15">
            <button onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full items-center gap-3 p-3.5 text-left sm:p-4 cursor-pointer">
                <span
                    className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-800">
                    <Image
                        src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${site}&size=128`}
                        alt="" className="object-cover" height={40} width={40}/>
                </span>
                <span className="min-w-0 flex-1">
                    <span
                        className="block truncate text-lg font-semibold text-slate-100 capitalize">{site}</span>
                    <span
                        className="mt-0.5 block text-[16px] text-slate-500">
                        {data.accounts.length} saved {data.accounts.length === 1 ? "account" : "accounts"}
                </span>
                </span>
                <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition ${isOpen ? "rotate-180 bg-teal-300/10 text-teal-200" : ""}`}>
                    <ChevronDown
                        size={18} color="currentColor"/>
                </span>
            </button>
            {
                isOpen && <div className="border-t border-white/8 bg-white/2 p-2 sm:p-3">
                    <CustomUl data={data.accounts}
                              className="space-y-2"
                              render={(account) =>
                                  <PasswordRender data={{...account, vault_id: data.vaultId}} key={account.password_id}/>}/>
                </div>
            }
        </section>
    );
};

export default Dropdown;
