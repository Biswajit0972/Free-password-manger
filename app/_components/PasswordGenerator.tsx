"use client";

import React, {useEffect, useState} from "react";
import {passwordGenerator, passwordStrength, passwordStrengthCheckHelper} from "../_utils/functions";
import {toast} from "react-toastify";
import {useApplicationcontext} from "../_context/Context";
import {useRouter} from "next/navigation";

const strengthWidths: Record<passwordStrength | "", string> = {
    "": "0%",
    Undetermined: "0%",
    "Very Weak": "16%",
    Weak: "30%",
    Fair: "45%",
    Good: "60%",
    Strong: "75%",
    "Very Strong": "88%",
    Excellent: "100%"
};
const strengthColors: Record<passwordStrength | "", string> = {
    "": "bg-slate-700",
    Undetermined: "bg-slate-700",
    "Very Weak": "bg-red-400",
    Weak: "bg-orange-400",
    Fair: "bg-amber-300",
    Good: "bg-lime-300",
    Strong: "bg-teal-300",
    "Very Strong": "bg-teal-200",
    Excellent: "bg-emerald-300"
};

const PasswordGenerator = () => {

    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [passwordLength, setPasswordLength] = useState(16);
    const [password, setPassword] = useState("");
    const [passwordFeedback, setPasswordFeedback] = useState<passwordStrength | string>("");
    const {dispatch} = useApplicationcontext();
    const router = useRouter();

    useEffect(() => {
        if (passwordLength >= 8) setPassword(passwordGenerator(passwordLength, includeNumbers, includeSymbols));
        if (refresh) setRefresh(false);
    }, [refresh, passwordLength, includeNumbers, includeSymbols]);

    useEffect(() => {
        if (password) setPasswordFeedback(passwordStrengthCheckHelper(password));
    }, [password]);

    const copyPassword = async () => {
        await navigator.clipboard.writeText(password);
        toast.success("Password copied to clipboard", {autoClose: 2000});
    };

    return (
        <div
            className="w-full rounded-3xl border border-white/10 bg-[#101621]/90 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            <div className="mb-7 flex items-start justify-between gap-4">
                <div><p className="text-xs font-semibold tracking-[.18em] text-teal-300">PASSWORD LAB</p><h2
                    className="mt-2 text-2xl font-semibold text-white">Generate a new key</h2></div>
                <div
                    className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1.5 text-xs font-medium text-teal-200">Encrypted
                </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#080c14] p-3">
                <input aria-label="Generated password"
                       className="w-full truncate bg-transparent px-2 text-lg font-semibold tracking-wider text-slate-100 outline-none"
                       type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className="mt-3 border-t border-white/8 px-2 pt-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Password strength</span>
                        <span className="font-semibold text-teal-300">{passwordFeedback || "Calculating"}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${strengthColors[passwordFeedback as passwordStrength] ?? "bg-slate-700"}`}
                            style={{width: strengthWidths[passwordFeedback as passwordStrength] ?? "0%"}}/>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500">Use 16+ characters with a mix of letters,
                        numbers, and symbols. Avoid common words and repeated patterns.</p>
                </div>
            </div>

            <div className="mt-6 space-y-6">
                <div>
                    <div className="mb-3 flex items-center justify-between"><label
                        className="text-sm font-medium text-slate-200">Password length</label><span
                        className="rounded-lg bg-slate-800 px-2.5 py-1 text-sm font-semibold text-teal-200">{passwordLength}</span>
                    </div>
                    <input type="range" min="8" max="50" className="slider" value={passwordLength}
                           onChange={(e) => setPasswordLength(Number(e.target.value))}/>
                    <div className="mt-2 flex justify-between text-[11px] text-slate-600"><span>8</span><span>50 characters</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {[["Numbers", includeNumbers, setIncludeNumbers], ["Symbols", includeSymbols, setIncludeSymbols]].map(([label, active, setter]) => (
                        <button key={label as string}
                                onClick={() => (setter as React.Dispatch<React.SetStateAction<boolean>>)(!active)}
                                className={`flex items-center justify-between rounded-xl border p-3 text-sm font-medium transition ${active ? "border-teal-300/40 bg-teal-300/10 text-teal-100" : "border-white/10 bg-white/[.03] text-slate-400 hover:bg-white/[.07]"}`}>
                            {label as string}<span
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${active ? "bg-teal-300 text-slate-950" : "border border-slate-600"}`}>{active ? "✓" : ""}</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        className="rounded-xl border border-white/10 bg-white/4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[.1]"
                        onClick={() => setRefresh(true)}>↻ Regenerate
                    </button>
                    <button
                        className="rounded-xl bg-teal-300 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-200"
                        onClick={copyPassword}>Copy password
                    </button>
                </div>
                <button
                    className="w-full rounded-xl border border-slate-600/70 py-3 text-sm font-semibold text-slate-200 transition hover:border-teal-300/50 hover:bg-teal-300/5"
                    onClick={() => {
                        dispatch({type: "ADD_PASSWORD", payload: password});
                        router.push("/password");
                    }}>Save to password manager →
                </button>
            </div>
        </div>
    );
};

export default PasswordGenerator;
