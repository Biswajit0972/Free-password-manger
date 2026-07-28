"use client";

import {useEffect, useState} from "react";
import {base64ToArrayBuffer, decryptData, decryptDerivedKey, deriveMasterKey} from "../_utils/functions/keyHelper";
import {useAuth} from "@clerk/nextjs";
import {Account, IVault} from "../_utils/type";
import {useDeletePassword, useFetch, useGetUserData} from "../_utils/hooks";
import {toast} from "react-toastify";
import {fetchUserData, fetchVaultById} from "@/app/_utils/functions/fetch";
import {useApplicationcontext} from "@/app/_context/Context";

const PasswordRender = ({data}: { data: Account }) => {
    const {password: encryptedPassword, password_iv, password_id, username ,vault_id} = data;
    const [passwordToggler, setPasswordToggler] = useState(false);
    const [password, setPassword] = useState(encryptedPassword);
    const [masterPassword, setMasterPassword] = useState<string>("");
    const [isPasswordDecrypted, setIsPasswordDecrypted] = useState(false);

    // !  authUser Required
    const {userId} = useAuth();

    const {state: {vaultId}} = useApplicationcontext();
    const {
        data: authUser,
        isError,
        error
    } = useFetch("fetchUser", () => fetchUserData(userId!.split("_")[1]));

    const {
        data: vault,
        error: vaultError,
        isError: isVaultError,
        isLoading: loadingVault
    } = useFetch<IVault>("fetchVaultById", () => fetchVaultById(vaultId, authUser._id))

    const {error: deleteError, isError:isDeleteError, isPending,  mutate: deletePasswordUsingID} = useDeletePassword();

    useEffect(() => {
        if (isError) {
            console.error("Error fetching user data:", error);
            toast.error("internal server issue, please try again");
        }

        if (!vaultId) {
            toast.error("please choose a vault to create  password");
        }

        if (isVaultError) {
            console.error("Error fetching user data:", vaultError);
            toast.error("internal server issue, please try again");
        }

        if (!loadingVault && !vault) {
            toast.error("Error fetching vault");
        }

        if (isDeleteError) {
            toast.error("Error Deleting Password");
        }
    }, [vaultId, error, isError, isVaultError, vaultError, isDeleteError, deleteError]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isPasswordDecrypted) {
                setPassword(encryptedPassword);
                setIsPasswordDecrypted(false);
                setPasswordToggler(false);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [isPasswordDecrypted, encryptedPassword]);


    const decryptHelper = async (): Promise<string | void> => {
        const salt = base64ToArrayBuffer(vault!.salt);
        const Iv = base64ToArrayBuffer(vault!.wrapIv);

        // generate derived key
        const derivedKey = await deriveMasterKey(masterPassword, salt);
        const wrapVault = base64ToArrayBuffer(vault?.wrappedVaultKey!)
        const vaultKey = await decryptDerivedKey(derivedKey, wrapVault, Iv);

        return await decryptData(encryptedPassword, vaultKey, password_iv);
    };

    const toggleVisibility = async () => {
        try {

            if (!masterPassword || masterPassword.trim() === "") {
                toast.error("Please enter Master  password first to decrypt account's password");
                return;
            }

            if (!isPasswordDecrypted) {
                const decrypted = await decryptHelper();
                if (!decrypted) throw new Error("Unable to decrypt password");
                setPassword(decrypted);
                setIsPasswordDecrypted(true);
            }
            setPasswordToggler((current) => !current);
        } catch (error) {
            console.log(error)
            toast.error("Failed to decrypt password. Please try again.");
        }
    };

    const copyPassword = async () => {
        try {
            if (!masterPassword || masterPassword.trim() === "") {
                toast.error("Please enter Master  password first to decrypt account's password");
                return;
            }

            const decrypted = await decryptHelper();
            if (!decrypted) throw new Error();
            await navigator.clipboard.writeText(decrypted);
            toast.success("Password copied to clipboard");
        } catch(err) {
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
                        {username}
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
                            onClick={() => deletePasswordUsingID({password_id, vault_id:vault_id!})}>
                        💀
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
                        aria-label="Master password used for decryption" type="password"
                        placeholder="Enter Master password to decrypt" value={masterPassword}
                        onChange={(e) => setMasterPassword(e.target.value)}
                        className="min-w-0  w-full flex-1 bg-transparent px-1 font-mono text-sm tracking-widest text-slate-300 outline-none"/>

                </div>
            </div>

            {isPasswordDecrypted &&
                <p className="mt-2 text-[11px] text-teal-300/80">Visible temporarily — it will hide automatically.</p>}
        </article>
    );
};

export default PasswordRender;
