"use client";
import React, { useState } from "react";
import { cryptoKeyGen } from "../_utils/functions/keyGen";
import { useCryptoContext } from "../_context/CryptoProvider";
import { useGetUserData } from "../_utils/hooks";
import { useAuth } from "@clerk/nextjs";
import { EncryptionResponse } from "../_utils";
import { toast } from "react-toastify";



export const MasterPasswordPopup = () => {
  const [masterPassword, setMasterPassword] = useState<string>("");
  const { setDerivedKey } = useCryptoContext();
  const { userId } = useAuth();

  const { isPending, error, mutateAsync } = useGetUserData();

  if (error) {
    console.error("Error fetching user data:", error);
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const masterPassword = formData.get("masterPassword") as string;

    const user: EncryptionResponse = await mutateAsync(userId!.split("_")[1]);

      if (!user.data._id) {
      console.error("User ID not found in response data");
      return;
    }

    const derivedKey = await cryptoKeyGen(
      masterPassword,
      user.data.saltDataKey,
      user.data.saltEnKey,
      user.data.EnIvKey
    );

    if (!derivedKey) {
      toast.error("Failed to generate derived key. Please try again.");
      return;
    }
    setDerivedKey(derivedKey);
    
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg w-80 max-w-full shadow-lg flex flex-col items-center">
      
        <h2 className="text-xl font-semibold mb-4">Enter Master Password</h2>
        <div className="mb-4 text-center text-red-600 font-semibold">
          ⚠️ Please{" "}
          <span className="font-bold">reuse this master password</span> every
          time.
          <br />
          Losing or forgetting it will make your encrypted data inaccessible.
          <br />
          For best service, enter the{" "}
          <span className="font-bold">same master password</span> each time you
          log in.
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            name="masterPassword"
            type="password"
            placeholder="Master Password"
            value={masterPassword}
            autoFocus
            autoComplete="current-password"
            onChange={(e) => setMasterPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold transition-colors cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
