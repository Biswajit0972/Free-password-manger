"use client";

import Image from "next/image";
import React, { useState } from "react";
import fakeLogo from "@/public/download (2).gif";
import { ChevronDown, ChevronUp } from "@deemlol/next-icons";
import { User } from "../_utils";
import PasswordRender from "./PasswordRender";

const Dropdown = ({appName, userDetails=[], image}: {appName: string; userDetails: User[]; image: string}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  
  return (
    <div className="relative w-full max-h-60 flex-column gap-2 overflow-hidden mb-2">
      <div
        className="header w-full h-12 rounded-lg bg-gray-400 flex-between px-1"
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      >
        <div className="max-w-1/2 h-full flex-between gap-2 ">
          <div className="w-10 h-10 rounded-full object-cover overflow-hidden bg-green-500 ">
            <Image src={fakeLogo} alt="app icon" className="object-cover" />
          </div>
          <span className="text-white font-bold text-sm">{appName}</span>
        </div>
        <div className="relative">
          {isDropDownOpen ? (
            <ChevronUp size={24} color="#FFFFFF" />
          ) : (
            <ChevronDown size={24} color="#FFFFFF" />
          )}
        </div>
      </div>
     {
      isDropDownOpen &&  <div
        className={`w-full bg-gray-500 rounded-md 
           max-h-46 
         transition-all ease-in-out p-1 overflow-auto  `}
      >
        { userDetails.map((user, index) => (
          <PasswordRender
            Username={user.username}
            Password={user.password}
            key={index}
          />
        ))}
      </div>
     }
    </div>
  );
};

export default Dropdown;
