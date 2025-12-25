"use client";

import Image from "next/image";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "@deemlol/next-icons";
import { SiteData } from "../_utils";
import PasswordRender from "./PasswordRender";
import CustomUl from "./CustomUl";

const Dropdown = ({ data }: { data: SiteData }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const siteImage = data.sitename.split("/");

  return (
    <div className="relative w-full  flex-column gap-2 overflow-hidden mb-2">
      <div
        className="header w-full h-12 rounded-lg bg-gray-400 flex-between px-1"
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
      >
        <div className="max-w-1/2 h-full flex-between gap-2 ">
          <div className="w-10 h-10 rounded-full object-cover overflow-hidden ">
            <Image
              src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${
                siteImage[siteImage.length - 1]
              }&size=128`}
              alt="app icon"
              className="object-cover"
              height={40}
              width={40}
            />
          </div>
          <span className="text-white font-bold text-sm capitalize">
            {siteImage[siteImage.length - 1]}
          </span>
        </div>
        <div className="relative">
          {isDropDownOpen ? (
            <ChevronUp size={24} color="#FFFFFF" />
          ) : (
            <ChevronDown size={24} color="#FFFFFF" />
          )}
        </div>
      </div>
      {isDropDownOpen && (
        <div
          className={`w-full bg-gray-500 rounded-md 
           max-h-80 overflow-y-auto hide-scrollbar`}
        >
          <CustomUl
            data={data.accounts}
            className="w-full h-full  overflow-y-auto"
            render={(user, index) => (
              <PasswordRender
                Username={user.username}
                Password={user.password}
                key={index}
                password_id={user.password_id}
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
