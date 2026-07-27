"use client";

import {FormEvent, SubmitEventHandler, SyntheticEvent, useEffect, useState} from "react";
import {useAuth} from "@clerk/nextjs";
import {useCreateVault, useFetch} from "@/app/_utils/hooks";
import {fetchUserData, fetchVaults} from "@/app/_utils/functions/fetch";
import {IVault} from "@/app/_utils/type";
import {generateVaultKey} from "@/app/_utils/functions/keyGen";
import {toast} from "react-toastify";
import {
    arrayBufferToBase64,
    deriveMasterKey,
    encryptDerivedKey,
    generateIv,
    generateSalt
} from "@/app/_utils/functions/keyHelper";

const VaultSelector = () => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [vaultName, setVaultName] = useState<string>("");
    const [masterPassword, setMasterPassword] = useState<string>("");
    const [vault, setVault] = useState<string>("");

    const userId = "user_30x0kyf3rMPcE8z2aPzuAcZN5v0";

    const {data: authUser} = useFetch("fetchUser", () => fetchUserData(userId!.split("_")[1]));
    const {isLoading: loadVaults, data: vaults} = useFetch<IVault[]>("fetchVaults", () => fetchVaults(authUser._id));
    const {error, isError, isPending, mutateAsync} = useCreateVault();

    const handleCreateVault = async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const vaultKey = await generateVaultKey();
        if (!vaultKey) {
            toast.error("Vault key generation failed.");
            return;
        }

        if (!vaultName || vaultName.trim() === "") {
            toast.error("Enter a valid vault name.");
            return;
        }

        const salt = generateSalt(24);
        const derivedKey = await deriveMasterKey(masterPassword, salt);
        const Iv = generateIv();
        const encrypted = await encryptDerivedKey(derivedKey, vaultKey, Iv);
        await mutateAsync({
            user_id: authUser._id,
            vaultName,
            wrapIv: encrypted.iv,
            wrappedVaultKey: encrypted.encryptedKey,
            salt: arrayBufferToBase64(salt.buffer),
            version: "1"
        });
    };

    useEffect(() => {
        if (isError) {
            toast.error("Error creating vault");
            console.log(error.message)
        }
    }, [error, isError]);

    return (
        <div
            className="rounded-2xl border border-white/10 bg-[#101621]/80 p-2.5 shadow-lg shadow-black/15 backdrop-blur-xl">
            <div className="flex items-center gap-3">
                <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-300/10 text-teal-200">⌁
                </div>
                <label className="min-w-0 flex-1"><span
                    className="mb-0.5 block text-xs font-semibold uppercase tracking-[.12em] text-slate-500">Current vault</span>
                    <select
                        aria-label="Current vault" value={vault}
                        onChange={(event) => setVault(event.target.value)}
                        className="w-full cursor-pointer appearance-none bg-transparent pr-5 text-sm font-semibold text-slate-100 outline-none">
                        <option className="bg-[#101621]" value="">Select a vault</option>
                        {
                            !loadVaults && vaults!.map((vault) =>
                                <option className="bg-[#101621]" value={vault.vaultName}
                                        key={String(vault._id) ?? vault.vaultName}>
                                    {vault.vaultName}
                                </option>)
                        }
                    </select>
                </label>
                <button onClick={() => setIsFormOpen((open) => !open)} title="Create vault" aria-label="Create vault"
                        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-teal-300 text-xl font-medium text-slate-950 shadow-lg shadow-teal-300/20 transition hover:scale-105 hover:bg-teal-200 active:scale-95">
                    ➕
                </button>
            </div>
            {isFormOpen &&
                <form onSubmit={handleCreateVault}
                      className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-2 border-t border-white/8 pt-3">
                    <input
                        value={vaultName} onChange={(event) => setVaultName(event.target.value)}
                        placeholder="Enter vault name" maxLength={80} autoFocus
                        className="h-10 min-w-0 flex-1 rounded-xl border bg-[#080c14] px-3 text-sm outline-none placeholder:text-slate-600 focus:border-teal-300/50"/>

                    <input
                        type="password"
                        value={masterPassword}
                        onChange={(event) => setMasterPassword(event.target.value)}
                        placeholder="Enter master password"
                        autoComplete="new-password"
                        className="col-span-2 h-10 w-full rounded-xl border bg-[#080c14] px-3 text-sm outline-none placeholder:text-slate-600 focus:border-teal-300/50"/>

                    <button type="submit" disabled={isPending}
                            className="col-start-2 row-start-1 rounded-xl bg-teal-300 px-3 text-sm font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">
                        {isPending ? "Creating…" : "Create"}
                    </button>
                </form>}
        </div>
    );
};

export default VaultSelector;
