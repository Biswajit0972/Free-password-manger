"use client";

import React, { useEffect, useState } from "react";
import {
  passwordGenerator,
  passwordStrength,
  passwordStrengthCheckHelper,
} from "../_utils/functions";
import { toast } from "react-toastify";

const PasswordGenerator = () => {
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [password, setPassword] = useState<string>("");

  const [passwordFeedback, setPasswordFeedback] = useState<
    passwordStrength | string
  >("");

  useEffect(() => {
    console.log(passwordLength);
   
    if (passwordLength < 8) {
      return;
    } 

    let response = passwordGenerator(
      passwordLength,
      includeNumbers,
      includeSymbols
    );

    if (refresh) {
        response = passwordGenerator(
          passwordLength,
          includeNumbers,
          includeSymbols
        );
      setRefresh(false);
    }
    
    setPassword(response);
  }, [refresh, passwordLength, includeNumbers, includeSymbols]);

  useEffect(() => {
    // ! check if password pasted  by user
    if (password.length >= 1) {
      const feedback = passwordStrengthCheckHelper(password);
      setPasswordFeedback(feedback);
    }
  }, [password, passwordFeedback]);

  return (
    <div className="w-full relative bg-gray-100 rounded-md p-2 flex-center-column gap-2 sm:p-5 sm:shadow-2xl sm:shadow-[#000000]">
      {/* input field */}
      <div className="w-full relative overflow-hidden flex flex-col gap-1">
        <input
          className="w-full h-10 bg-gray-800 rounded-md border-0 outline-1 outline-blue-500 text-white px-2 text-lg font-semibold"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-[17px] font-sans font-semibold text-gray-700">
          Strength: <span>{passwordFeedback}</span>
        </p>
      </div>

      <p className="secondary-font">Customize your new password</p>

      <div className="w-full relative flex-center-column gap-2">
        {/* Slider + Number */}
        <div className=" border-b border-gray-700 pb-4 w-full flex-between gap-2">
          <div className="w-[85%] h-10 flex-between relative gap-2">
            <h3 className="text-sm font-semibold text-gray-900">Character</h3>
            <input
              type="range"
              min="0"
              max="50"
              className="slider w-full"
            
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
          </div>
          <div className="h-10 w-[15%] relative">
            <input
              type="number"
              className="no-spinner w-full h-full bg-white rounded-md border-0 outline-1 outline-blue-500 text-gray-900 px-2 text-sm font-semibold"
              value={passwordLength === 0 ? "" : passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="w-full border-b border-gray-700 p-2">
          <div className="w-[80%] relative flex-between gap-2 ">
            <button
              onClick={() => setIncludeNumbers(!includeNumbers)}
              className={`px-4 py-2 cursor-pointer rounded-md font-semibold text-white text-sm ${
                includeNumbers ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              Numbers {includeNumbers ? "✔" : "✖"}
            </button>

            <button
              onClick={() => setIncludeSymbols(!includeSymbols)}
              className={`px-4 py-2 cursor-pointer rounded-md font-semibold text-white text-sm ${
                includeSymbols ? "bg-blue-500" : "bg-green-500"
              }`}
            >
              Symbols {includeSymbols ? "✔" : "✖"}
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex justify-between gap-2 mt-2">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition  cursor-pointer" onClick={() => setRefresh(true)}>
            🔄 Refresh
          </button>
          <button className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition  cursor-pointer" onClick={() => {
            navigator.clipboard.writeText(password);
            toast("Password copied to clipboard!", {autoClose:2000, type: "success"});
          }}>
            📋 Copy
          </button>
        </div>

        {/* Save Button */}
        <button className="w-full bg-gray-700 text-white font-bold py-3 rounded-md text-lg hover:bg-gray-800 transition cursor-pointer">
          💾 Save Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
