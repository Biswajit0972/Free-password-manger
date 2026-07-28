"use client";

import {useEffect, useState} from "react";
import {decryptData} from "../_utils/functions/keyHelper";
import {useCryptoContext} from "../_context/CryptoProvider";
import {decryptSessionKey} from "../_utils/functions/keyGen";
import {useAuth} from "@clerk/nextjs";
import {EncryptionResponse} from "../_utils/type";
import {useDeletePassword, useGetUserData} from "../_utils/hooks";
import {toast} from "react-toastify";

const PasswordRender = ({Username, Password, password_id}: {
    Username: string;
    Password: string;
    password_id: string
}) => {
    const [passwordToggler, setPasswordToggler] = useState(false);
    const [password, setPassword] = useState(Password);
    const [isPasswordDecrypted, setIsPasswordDecrypted] = useState(false);
    const {derivedKey} = useCryptoContext();
    const {userId} = useAuth();
    const {error, mutateAsync} = useGetUserData();
    const {error: deleteError, mutateAsync: deletePasswordUsingID} = useDeletePassword();

    useEffect(() => {
        if (error) toast.error("Internal server issue, please try again");
    }, [error]);

    useEffect(() => {
        if (deleteError) toast.error("Failed to delete password. Please try again.");
    }, [deleteError]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isPasswordDecrypted) {
                setPassword(Password);
                setIsPasswordDecrypted(false);
                setPasswordToggler(false);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [isPasswordDecrypted, Password]);


    const decryptHelper = async (): Promise<string | void> => {
        const user: EncryptionResponse = await mutateAsync(userId!.split("_")[1]);
        if (!user.data._id) return;
        const dataKey = await decryptSessionKey(derivedKey!, user.data.EnIvKey);
        if (!dataKey) return;
        return decryptData(Password, dataKey, user.data.EnIvData);
    };

    const toggleVisibility = async () => {
        try {
            if (!isPasswordDecrypted) {
                const decrypted = await decryptHelper();
                if (!decrypted) throw new Error("Unable to decrypt password");
                setPassword(decrypted);
                setIsPasswordDecrypted(true);
            }
            setPasswordToggler((current) => !current);
        } catch {
            toast.error("Failed to decrypt password. Please try again.");
        }
    };

    const copyPassword = async () => {
        try {
            const decrypted = await decryptHelper();
            if (!decrypted) throw new Error();
            await navigator.clipboard.writeText(decrypted);
            toast.success("Password copied to clipboard");
        } catch {
            toast.error("Failed to copy password. Please try again.");
        }
    };

    return (
        <article
            className="rounded-xl border border-white/[.07] bg-[#111827] p-3 transition hover:border-white/13 sm:p-4">

            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0">
                    <p
                        className="text-lg font-semibold uppercase tracking-[.14em] text-slate-500">Username
                    </p>
                    <h3
                        className="mt-1 truncate text-[16px] font-semibold text-slate-100">
                        {Username}
                    </h3>
                </div>

                <div className="flex shrink-0 gap-2">
                    <button aria-label="Copy password" title="Copy password"
                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-teal-300/10 text-[16px] text-teal-200 transition hover:bg-teal-500 hover:text-slate-950"
                            onClick={copyPassword}>
                        📄
                    </button>

                    <button aria-label="Delete password" title="Delete password"
                            className="flexh-12 w-12 cursor-pointer items-center justify-center rounded-lg bg-red-400/10 text-[16px] text-red-300 hover:text-white transition hover:bg-red-500 hover:text-slate-950"
                            onClick={() => deletePasswordUsingID(password_id)}>
                        X
                    </button>

                </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-2 ">
                <div className="flex items-center w-[65%] rounded-lg border border-white/[.07] bg-black/20 p-2 ">
                    <input
                        aria-label="Saved password" type={passwordToggler ? "text" : "password"} value={password}
                        readOnly
                        className="min-w-0 flex-1 bg-transparent px-1 font-mono text-sm tracking-widest text-slate-300 outline-none"/>

                    <div className="flex gap-4 items-center">
                        <button aria-label={passwordToggler ? "Hide password" : "Show password"}
                                title={passwordToggler ? "Hide password" : "Show password"} onClick={toggleVisibility}
                                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-sm text-slate-400 transition hover:bg-white/10 hover:text-slate-100">{passwordToggler ? "◉" : "○"}
                        </button>

                        <button aria-label="Copy password" title="Copy password"
                                className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-sm text-slate-400 transition hover:bg-white/10 hover:text-slate-100"
                                onClick={copyPassword}>⧉
                        </button>
                    </div>
                </div>
                <div className="relative rounded-lg border border-white/[.07] bg-black/20 p-2 w-[35%]">
                    <input
                        aria-label="Saved password" type="password" placeholder="Enter Master password to decrypt"
                        className="min-w-0  w-full flex-1 bg-transparent px-1 font-mono text-sm tracking-widest text-slate-300 outline-none"/>

                </div>
            </div>

            {isPasswordDecrypted &&
                <p className="mt-2 text-[11px] text-teal-300/80">Visible temporarily — it will hide automatically.</p>}
        </article>
    );
};

export default PasswordRender;
