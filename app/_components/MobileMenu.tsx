"use client";

import React, { useState } from "react";
import { AlignJustify, AlignCenter } from "@deemlol/next-icons";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative h-full w-10 flex-center cursor-pointer">
      <div
        className="transition-all duration-300 ease-in-out transform"
        key={isOpen ? "open" : "closed"}
      >
        {isOpen ? (
          <AlignCenter
            size={35}
            className="text-green-500 scale-100 opacity-100 transition-all duration-300"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <AlignJustify
            size={35}
            className="text-green-500 scale-100 opacity-100 transition-all duration-300"
            onClick={() => setIsOpen(true)}
          />
        )}

        
      </div>
      
    </div>
  );
};

export default MobileMenu;
