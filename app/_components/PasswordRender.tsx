"use client";

import { useState } from "react";
import { decryptData } from "../_utils/functions/keyHelper";
import { useCryptoContext } from "../_context/CryptoProvider";
import { decryptSessionKey } from "../_utils/functions/keyGen";
import { useAuth } from "@clerk/nextjs";
import { EncryptionResponse } from "../_utils";
import { useGetUserData } from "../_utils/hooks";

const PasswordRender = ({
  Username,
  Password,
}: {
  Username: string;
  Password: string;
}) => {
  const [passwordToggler, setpasswordToggler] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(Password);
  const { derivedKey } = useCryptoContext();
  const { userId } = useAuth();
  const { error, mutateAsync } = useGetUserData();
  
  if (error) {
    console.error("Error fetching user data:", error);
  }

  const testing = async () => {
    const user: EncryptionResponse = await mutateAsync(userId!.split("_")[1]);

    if (!user.data._id) {
      console.error("User ID not found in response data");
      return;
    }

    const enIv = user.data.EnIvKey;
    const dataEnkey = await decryptSessionKey(derivedKey!, enIv);
    if (!dataEnkey) {
      console.error("Failed to decrypt session key");
      return;
    }

    const decryptedPassword = await decryptData(
      Password,
      dataEnkey,
      user.data.EnIvData
    );

    setPassword(decryptedPassword);
  };

  return (
    <div className="w-full  p-2 bg-gray-100 rounded-md shadow-sm mb-1 ">
      <div className="text-sm font-medium text-gray-700 border-b border-gray-300 py-1 h-8 flex items-center gap-3">
        <span className="font-bold text-[14px]">Username:</span>{" "}
        <h3 className="font-semibold text-sm text-gray-800">{Username}</h3>
      </div>
      <div className="text-sm font-medium text-gray-700 border-b border-gray-300 py-1  flex-between">
        <span className="text-[14px] font-bold"> Password:</span>{" "}
        <input
          type={passwordToggler ? "text" : "password"}
          value={password}
          readOnly
          className="bg-gray-300  h-8 max-w-[55%] rounded-md px-2"
        />
        <div className="w-[15%] flex-between  text-lg">
          <button
            onClick={() => {
              setpasswordToggler(!passwordToggler);
              testing();
            }}
            className="bg-gray-300 rounded-md cursor-pointer"
          >
            {passwordToggler ? "🙈" : "👁️"}
          </button>
          <button
            className="bg-gray-300 rounded-md cursor-pointer"
            onClick={() => navigator.clipboard.writeText(Password)}
          >
            📋
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordRender;
