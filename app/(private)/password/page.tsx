"use client";

import CustomUl from "@/app/_components/CustomUl";
import Dropdown from "@/app/_components/Dropdown";
import { MasterPasswordPopup } from "@/app/_components/MasterPasswordPopup";
import PasswordForm from "@/app/_components/PasswordForm";
import { useApplicationcontext } from "@/app/_context/Context";
import { useCryptoContext } from "@/app/_context/CryptoProvider";
import { SiteData } from "@/app/_utils";
import { fetchPasswords } from "@/app/_utils/functions/fetch";
import { useAuth } from "@clerk/nextjs";
import { FolderPlus } from "@deemlol/next-icons";
import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";

const Password = () => {
  const {state, dispatch} = useApplicationcontext();
  const { derivedKey } = useCryptoContext();
  const { userId } = useAuth();

  const {
    data: passwords,
    isLoading,
    error,
  } = useQuery<SiteData[]>({
    queryKey: ["passwords"],
    queryFn: () => fetchPasswords(userId!.split("_")[1]),
    enabled: !!userId,
  });

  if (!derivedKey) return <MasterPasswordPopup />;

  if (error) {
    toast.error("Failed to fetch passwords. Please try again later.");
  }
  
  return (
    <div className="w-full h-full relative px-5 py-1 overflow-hidden flex-column">
      <div className="w-full h-full relative ">
        <h1 className="secondary-font text-center font-bold ">
          Password Store
        </h1>
        <div className="w-full h-[calc(100%-2rem)]   bg-gray-200 p-1 rounded-lg relative">
          {isLoading ? (
            <div className="flex-center h-full">Loading...</div>
          ) : passwords && passwords.length > 0 ? (
            <CustomUl
              data={passwords}
              className="w-full h-full overflow-y-auto "
              render={(password) => (
                <Dropdown key={password.sitename} data={password} />
              )}
            />
          ) : (
            "No passwords found"
          )}
          {state.openForm && <PasswordForm/>}
        </div>

       {
        !state.openForm &&  <button
          className="h-15 w-15 absolute bottom-2 right-2 bg-green-500 rounded-full cursor-pointer flex-center hover:bg-green-600 transition-all duration-300 z-10"
          onClick={() => dispatch({type:"TOGGLE_FORM"})}
        >
          <FolderPlus size={24} color="#FFFFFF" />
        </button>
       }
      </div>
    </div>
  );
};

export default Password;
