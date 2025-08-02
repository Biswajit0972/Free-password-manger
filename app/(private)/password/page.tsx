"use client";

import CustomUl from "@/app/_components/CustomUl";
import Dropdown from "@/app/_components/Dropdown";
import { MasterPasswordPopup } from "@/app/_components/MasterPasswordPopup";
import PasswordForm from "@/app/_components/PasswordForm";
import { useCryptoContext } from "@/app/_context/CryptoProvider";
import { fakeData } from "@/app/_utils";
import { FolderPlus } from "@deemlol/next-icons";
import React, { useState } from "react";

const Password = () => {

  const [open, setOpen] = useState<boolean>(false);
  const {derivedKey} =  useCryptoContext();
 

  return (
    <div className="w-full h-full relative px-5 py-1 overflow-hidden flex-column">
      {derivedKey ? (
        <div className="w-full h-full relative ">
          <h1 className="secondary-font text-center font-bold ">
            Password Store
          </h1>
          <div className="w-full h-[calc(100%-2rem)]   bg-gray-200 p-1 rounded-lg relative">
            <CustomUl
              data={fakeData}
              render={(data, index) => (
                <Dropdown
                  key={index}
                  appName={data.sitename}
                  userDetails={data.account}
                  image={data.icon}
                />
              )}
            />
            {open && <PasswordForm />}
          </div>

          <button
            className="h-15 w-15 absolute bottom-2 right-2 bg-green-500 rounded-full cursor-pointer flex-center hover:bg-green-600 transition-all duration-300 z-10"
            onClick={() => setOpen(!open)}
          >
            <FolderPlus size={24} color="#FFFFFF" />
          </button>
        </div>
      ) : (
        <MasterPasswordPopup />
      )}
    </div>
  );
};

export default Password;
