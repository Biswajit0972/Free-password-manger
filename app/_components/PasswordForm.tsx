import {useEffect, useState} from "react";
import Image from "next/image";
import demoImg from "@/public/download (2).gif";
import Input from "./Input";
import {useForm} from "react-hook-form";
import {Encryption, EncryptionResponse, IVault, passwordForm} from "../_utils/type";
import {useApplicationcontext} from "../_context/Context";
import {useCreatePassword, useFetch, useGetUserData} from "../_utils/hooks";
import {useAuth} from "@clerk/nextjs";
import {decryptSessionKey} from "../_utils/functions/keyGen";
import {useCryptoContext} from "../_context/CryptoProvider";
import {
    arrayBufferToBase64,
    base64ToArrayBuffer,
    decryptDerivedKey,
    deriveMasterKey,
    encryptData,
    generateIv, importVaultKey
} from "../_utils/functions/keyHelper";
import {toast} from "react-toastify";
import {fetchUserData, fetchVaultById, fetchVaults} from "@/app/_utils/functions/fetch";

const PasswordForm = () => {
    const [icon, setIcon] = useState<string>("");
    const {
        state: {password, vaultId},
        dispatch,
    } = useApplicationcontext();
    console.log(vaultId)


    // const { userId } = useAuth();

    const userId = "user_30x0kyf3rMPcE8z2aPzuAcZN5v0";

    const {
        data: authUser,
        isError,
        error
    } = useFetch("fetchUser", () => fetchUserData(userId!.split("_")[1]));
    const {data: vault, error: vaultError, isError: isVaultError, isLoading: loadingVault} = useFetch<IVault>("fetchVaultById", () => fetchVaultById(vaultId, authUser._id))

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

        if (!loadingVault&&!vault) {
            toast.error("Error fetching vault");
        }
    }, [vaultId, error, isError, isVaultError, vaultError]);

    const {
        mutateAsync: createPassword,
        error: createError,
        isPending,
    } = useCreatePassword();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<passwordForm>({
        defaultValues: {
            applicationLink: "",
            username: "",
            password: password.length > 0 ? password : "",
            masterPassword: ""
        },
    });

    const onSubmit = async (data: passwordForm) => {
        const {applicationLink, username, password, masterPassword} = data;

        if ([applicationLink, username, password, masterPassword].some((item) => !item || item.trim() === "" || typeof item !== "string")) {
            toast.error("Please enter valid information");
            return;
        }


       try {
           const salt = base64ToArrayBuffer(vault!.salt);
           const Iv = base64ToArrayBuffer(vault!.wrapIv);

           // generate derived key
           const derivedKey = await deriveMasterKey(masterPassword, salt);
           const wrapVault = base64ToArrayBuffer(vault?.wrappedVaultKey!)
           const vaultKey = await decryptDerivedKey(derivedKey,  wrapVault, Iv);
           const passwordIv = arrayBufferToBase64(generateIv().buffer);
           const encryptedPassword = await encryptData(password, vaultKey, passwordIv);
           const obj: Encryption = {
               vaultId: `${vault!._id}`,
               user_id: `${authUser._id}`,
               username,
               password_obj: {
                   password: encryptedPassword.cipherText,
                   iv: encryptedPassword.iv,
               },
               application_link:applicationLink,
           }

           await createPassword(obj);
           toast.success("Password encrypted successfully!");
           dispatch({type: "TOGGLE_FORM"});
       }catch (error) {
           console.log("error decryption and password  creation!")
           if (error instanceof DOMException) {
               toast.error(`Enter correct MasterPassword`);
           }
       }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 p-4 py-8 backdrop-blur-sm sm:items-center"
            role="dialog" aria-modal="true" aria-label="Add a password">
            <div
                className="relative my-auto w-full max-w-md rounded-2xl border border-white/10 bg-[#151c2a] p-5 shadow-2xl shadow-black/50 sm:p-6">
                <button
                    className="absolute top-3 right-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-slate-400 transition hover:bg-red-400/15 hover:text-red-300"
                    onClick={() => dispatch({type: "TOGGLE_FORM"})}
                >
                    <p className="relative z-0">X</p>
                </button>
                <form
                    className="relative w-full flex-center-column gap-3 px-1"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h1 className="mb-2 text-lg font-bold text-slate-100">Add New Password</h1>

                    <div className="Application-icon w-full h-12  flex-center relative">
                        <div className="w-12 h-full relative  rounded-2xl overflow-hidden ">
                            <Image
                                src={
                                    icon.length > 3
                                        ? `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${icon}&size=128`
                                        : demoImg
                                }
                                alt="application-img"
                                fill
                                sizes="100%"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    {/* form start here */}

                    {/* Application Link */}
                    <div className="w-full relative">
                        <Input
                            inputClassName="h-10 w-full rounded-xl border border-white/10 bg-[#0b1019] px-4 text-sm font-semibold text-slate-100 outline-none placeholder:text-slate-600 sm:text-base focus:border-teal-300/50"
                            type="text"
                            {...register("applicationLink", {
                                required: "Application link is mandatory",
                            })}
                            placeholder="ex: google.com"
                            onChange={(e) => setIcon(e.currentTarget.value)}
                        />
                        {errors.applicationLink && (
                            <p className="mt-1 pl-3 text-sm text-red-500 sm:text-base">
                                {errors.applicationLink?.message}
                            </p>
                        )}
                    </div>
                    {/* Username */}
                    <div className="w-full relative">
                        <Input
                            inputClassName="h-10 w-full rounded-xl border border-white/10 bg-[#0b1019] px-4 text-sm font-semibold text-slate-100 outline-none placeholder:text-slate-600 sm:text-base focus:border-teal-300/50"
                            type="text"
                            {...register("username", {required: "username is mandatory"})}
                            placeholder="Username"
                        />
                        {errors.username && (
                            <p className="mt-1 pl-3 text-sm text-red-500 sm:text-base">
                                {errors.username?.message}
                            </p>
                        )}
                    </div>
                    {/* Password */}
                    <div className="w-full relative">
                        <Input
                            inputClassName="h-10 w-full rounded-xl border border-white/10 bg-[#0b1019] px-4 text-sm font-semibold text-slate-100 outline-none placeholder:text-slate-600 sm:text-base focus:border-teal-300/50"
                            type="text"
                            {...register("password", {required: "password is mandatory"})}
                            placeholder="Password"
                        />
                        {errors.password && (
                            <p className="mt-1 pl-3 text-sm text-red-500 sm:text-base">
                                {errors.password?.message}
                            </p>
                        )}
                    </div>
                    {/* Master Password */}
                    <div className="w-full relative">
                        <input
                            className="h-10 w-full rounded-xl border border-white/10 bg-[#0b1019] px-4 text-sm font-semibold text-slate-100 outline-none placeholder:text-slate-600 sm:text-base"
                            type="password"
                            {...register("masterPassword", {required: "MasterPassword is important to secure password"})}
                            placeholder="Enter master password"
                            autoComplete="current-password"
                        />
                      {errors.masterPassword && (
                          <p className="mt-1 pl-3 text-sm text-red-500 sm:text-base">
                            {errors.masterPassword?.message}
                          </p>
                      )}
                    </div>
                    <button
                        className="h-10 w-full cursor-pointer rounded-xl bg-teal-300 font-semibold text-slate-950 transition hover:bg-teal-200" disabled={isPending || !vault}>
                        {isPending ? "Creating..." : "Add Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordForm;
