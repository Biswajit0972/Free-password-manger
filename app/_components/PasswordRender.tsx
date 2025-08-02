"use client";

import { useState } from "react";
import { base64ToArrayBuffer, decryptData, encryptData } from "../_utils/functions/keyHelper";
import { useCryptoContext } from "../_context/CryptoProvider";
import { decryptSessionKey } from "../_utils/functions/keyGen";

const PasswordRender = ({
  Username,
  Password,
}: {
  Username: string;
  Password: string;
}) => {
  const [passwordToggler, setpasswordToggler] = useState<boolean>(false);
  const {derivedKey} = useCryptoContext();
  const testing =   async () => {
    const cipherEnIv =  sessionStorage.getItem("enIv");
   
    const cipherEnIvBuffer = base64ToArrayBuffer(cipherEnIv!);
  
    const dataEnkey = await decryptSessionKey(derivedKey!, cipherEnIvBuffer);
    const {cipherText, iv} = await encryptData(Password, dataEnkey!, cipherEnIvBuffer);
    const data = await decryptData(base64ToArrayBuffer(cipherText).buffer, dataEnkey!, cipherEnIvBuffer);
    console.log("actual data", Password);
    console.log("cipher text", cipherText);
    console.log("decrypted data", data);
  }
  return (
    <div className="w-full  p-2 bg-gray-100 rounded-md shadow-sm mb-1 ">
      <div className="text-sm font-medium text-gray-700 border-b border-gray-300 py-1 h-8 flex items-center gap-3">
         <span className="font-bold text-[14px]">Username:</span> <h3 className="font-semibold text-sm text-gray-800">{Username}</h3>
      </div>
      <div className="text-sm font-medium text-gray-700 border-b border-gray-300 py-1  flex-between">
        <span className="text-[14px] font-bold"> Password:</span>{" "}
        <input
          type={passwordToggler ? "text" : "password"}
          value={Password}
          readOnly
          className="bg-gray-300  h-8 max-w-[55%] rounded-md px-2"
        />
        <div className="w-[15%] flex-between  text-lg">
          <button
            onClick={() => {setpasswordToggler(!passwordToggler)
              testing()
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
