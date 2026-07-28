"use client";

import CustomUl from "@/app/_components/CustomUl";
import Dropdown from "@/app/_components/Dropdown";
import PasswordForm from "@/app/_components/PasswordForm";
import {useApplicationcontext} from "@/app/_context/Context";
import {SiteData} from "@/app/_utils/type";
import {fetchPasswords} from "@/app/_utils/functions/fetch";
import {useAuth} from "@clerk/nextjs";
import {FolderPlus} from "@deemlol/next-icons";
import {useQuery} from "@tanstack/react-query";
import {toast} from "react-toastify";
import VaultSelector from "@/app/_components/VaultSelector";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import Loading from "@/app/_components/Loading";

const Password = () => {
    const { state, dispatch } = useApplicationcontext();
    const { isLoaded, isSignedIn, userId } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/sign-in");
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded) {
        return <Loading />;
    }

    if (!isSignedIn) {
        return <p className="text-xl text-red-500 text-center">Authenticate your self first!</p>;
    }

    const {data: passwords, isLoading, error} = useQuery<SiteData[]>({
        queryKey: ["passwords", userId, state.vaultId],
        queryFn: () => fetchPasswords(userId!.split("_")[1], state.vaultId),
        enabled: !!userId && !!state.vaultId
    });

    if (error) {
        toast.error("Failed to fetch passwords. Please try again.");
        return <div className="p-8 text-slate-300">Unable to load your vault.</div>;
    }

    const accountCount = passwords?.reduce((count, site) => count + site.accounts.length, 0) ?? 0;


    return (
        <div className="min-h-full px-5 py-9 sm:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-5xl">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div
                            className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[.18em] text-teal-300">
                            <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_10px_#5eead4]"/> YOUR PRIVATE
                            VAULT
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Password manager</h1>
                        <p className="mt-2 text-sm text-slate-400">Your credentials are encrypted and only visible to
                            you.</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:items-end">
                        <VaultSelector/>
                        <button onClick={() => dispatch({type: "TOGGLE_FORM"})}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-300 px-4 text-sm font-bold text-slate-950 transition hover:bg-teal-200">
                            <FolderPlus size={19} color="#071018"/> Add password
                        </button>
                    </div>
                </div>

                <div className="mb-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p
                        className="text-xs font-medium text-slate-500">Saved accounts</p><p
                        className="mt-1 text-2xl font-bold text-white">{accountCount}</p></div>
                    <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p
                        className="text-xs font-medium text-slate-500">Websites</p><p
                        className="mt-1 text-2xl font-bold text-white">{passwords?.length ?? 0}</p></div>
                    <div className="rounded-2xl border border-teal-300/15 bg-teal-300/6 p-4"><p
                        className="text-xs font-medium text-teal-100/60">Vault status</p><p
                        className="mt-1 flex items-center gap-2 text-sm font-bold text-teal-200"><span
                        className="h-2 w-2 rounded-full bg-teal-300"/> Protected</p></div>
                </div>

                <div
                    className="rounded-3xl border border-white/10 bg-[#101621]/85 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
                    <div className="mb-3 flex items-center justify-between px-2"><p
                        className="text-sm font-semibold text-slate-200">All passwords</p><p
                        className="text-xs text-slate-500">Select a site to view accounts</p></div>
                    {isLoading ?
                        <div className="flex h-52 items-center justify-center text-sm text-slate-400">Loading your
                            encrypted vault…</div> : passwords?.length ?
                            <CustomUl data={passwords} className="space-y-3"
                                      render={(password) => <Dropdown key={password.sitename} data={password}/>}/> :
                            <div
                                className="flex h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 text-center">
                                <span className="text-2xl">⌁</span><p className="mt-3 font-semibold text-slate-200">Your
                                vault is ready</p><p className="mt-1 text-sm text-slate-500">Add your first password to
                                get started.</p></div>}
                </div>
                {state.openForm && <PasswordForm/>}
            </div>
        </div>
    );
};

export default Password;
