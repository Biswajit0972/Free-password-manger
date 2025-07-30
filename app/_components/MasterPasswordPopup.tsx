"use client";
import React, { useState } from "react";
import { cryptoKeyGen } from "../_utils/functions/keyGen";

type MasterPasswordPopupProps = {
  setSession: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export const MasterPasswordPopup: React.FC<MasterPasswordPopupProps> = ({
  setSession,
}) => {
  const [masterPassword, setMasterPassword] = useState<string>("");
  const [updating, setUpdating] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const masterPassword = formData.get("masterPassword") as string;
    // const salt = crypto.getRandomValues(new Uint8Array(16));
     cryptoKeyGen(masterPassword);
    setUpdating(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-8 rounded-lg w-80 max-w-full shadow-lg flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg"
          aria-label="Close"
          onClick={() => setSession(true)}
          type="button"
        >
          ✖
        </button>
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
            className="w-full p-2 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold transition-colors"
            disabled={updating}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
