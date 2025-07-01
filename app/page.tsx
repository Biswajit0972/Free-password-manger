"use client";

import React, { useState } from "react";

const Page = () => {
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  return (
    <div className="relative w-full h-full overflow-x-hidden flex-center-column px-2 flex-col gap-1">
      <div className="h-[35%] w-full relative pt-1">
        <div className="w-full relative flex-center-column gap-2">
          <h1 className="primary-font">Secure, Strong, and Simple</h1>
          <h1 className="text-2xl font-semibold font-sans">
            Try, our free password generator and manager.
          </h1>
          <p className="secondary-font">
            A powerful generator for powerful passwords to protect your online
            accounts.
          </p>
        </div>
      </div>

      <div className="h-[65%] w-full relative p-2">
        <div className="w-full relative bg-gray-300 rounded-md p-2 flex-center-column gap-2">
          {/* input field */}
          <div className="w-full relative overflow-hidden flex flex-col gap-1">
            <input
              className="w-full h-10 bg-gray-800 rounded-md border-0 outline-1 outline-blue-500 text-white px-2 text-lg font-semibold"
              type="text"
            />
            <p className="text-[17px] font-sans font-semibold text-gray-700">
              Strength: <span>High</span>
            </p>
          </div>

          <p className="secondary-font">Customize your new password</p>

          <div className="w-full relative flex-center-column gap-2">
            {/* Slider + Number */}
            <div className=" border-b border-gray-700 pb-4 w-full flex-between gap-2">
              <div className="w-[85%] h-10 flex-between relative gap-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  Character
                </h3>
                <input
                  type="range"
                  min="8"
                  max="50"
                  className="slider w-full"
                />
              </div>
              <div className="h-10 w-[15%] relative">
                <input
                  type="number"
                  className="no-spinner w-full h-full bg-white rounded-md border-0 outline-1 outline-blue-500 text-gray-900 px-2 text-sm font-semibold"
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
                    includeSymbols ?  "bg-blue-500" : "bg-green-500"
                  }`}
                >
                  Symbols {includeSymbols ? "✔" : "✖"}
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="w-full flex justify-between gap-2 mt-2">
              <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition  cursor-pointer">
                🔄 Refresh
              </button>
              <button className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition  cursor-pointer">
                📋 Copy
              </button>
            </div>

            {/* Save Button */}
            <button className="w-full bg-gray-700 text-white font-bold py-3 rounded-md text-lg hover:bg-gray-800 transition cursor-pointer">
              💾 Save Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
