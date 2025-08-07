"use client";

import { useEffect, useState } from "react";
import { decryptData } from "../_utils/functions/keyHelper";
import { useCryptoContext } from "../_context/CryptoProvider";
import { decryptSessionKey } from "../_utils/functions/keyGen";
import { useAuth } from "@clerk/nextjs";
import { EncryptionResponse } from "../_utils";
import { useGetUserData } from "../_utils/hooks";
import { toast } from "react-toastify";

const PasswordRender = ({
  Username,
  Password,
}: {
  Username: string;
  Password: string;
}) => {
  const [passwordToggler, setpasswordToggler] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(Password);
  const [isPasswordDecrypted, setIsPasswordDecrypted] =
    useState<boolean>(false);
  const { derivedKey } = useCryptoContext();
  const { userId } = useAuth();
  const { error, mutateAsync } = useGetUserData();

  if (error) {
    console.error("Error fetching user data:", error);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPasswordDecrypted) {
        setPassword(Password);
        setIsPasswordDecrypted(false);
        setpasswordToggler(false);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPasswordDecrypted, Password]);

  const decryptHelper = async (): Promise<string | void> => {
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

    return decryptedPassword;
  };

  const testing = async () => {
    try {
      if (!isPasswordDecrypted) {
        const decryptedPassword = await decryptHelper();

        if (!decryptedPassword) {
          throw new Error("something wents wrong");
        }
        setPassword(decryptedPassword);
        setIsPasswordDecrypted(true);
      }

      setpasswordToggler(!passwordToggler);
    } catch (error) {
      console.error("Error during password decryption:", error);
      toast.error("Failed to decrypt password. Please try again.");
    }
  };

  const clipBoardHelper = async (): Promise<void> => {
    try {
      const copyPassword = await decryptHelper();
      if (!copyPassword) {
        throw new Error("falied to decrypt password!");
      }

      navigator.clipboard.writeText(copyPassword);
      toast.success("password copied to clipboard");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "falied to copied password, please try again");
    }
  };

  return (
    <div className="w-full  p-2 bg-gray-100 rounded-md shadow-sm mb-1 max-h-28">
      <div className="text-sm font-medium text-gray-700 border-b border-gray-300 py-1 h-8 flex items-center gap-3">
        <span className="font-bold text-[14px]">Username:</span>{" "}
        <h3 className="font-semibold text-sm text-gray-800">{Username}</h3>
      </div>
      <div className="text-sm font-medium text-gray-700 border-b border-gray-300 py-1  flex-between">
        <div className="h-full w-[75%]  flex-between overflow-hidden">
          <span className="text-[14px] font-bold"> Password:</span>{" "}
          <input
            type={passwordToggler ? "text" : "password"}
            value={password}
            readOnly
            className="bg-gray-300  h-8 max-w-[70%] rounded-md px-2 border-none outline-none text-gray-800 text-[17px]"
          />
        </div>

        <div className="w-[20%] flex-between  text-lg">
          <button
            onClick={() => {
              testing();
            }}
            className="bg-gray-300 rounded-md cursor-pointer"
          >
            {passwordToggler ? "🙈" : "👁️"}
          </button>
          <button
            className="bg-gray-300 rounded-md cursor-pointer"
            onClick={() => clipBoardHelper()}
          >
            📋
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordRender;
