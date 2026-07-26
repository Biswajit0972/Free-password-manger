import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer h-full w-15">
      <div className=" h-full w-full relative bg-[#605B51] rounded-full flex-center">
        <p className="text-2xl font-bold text-white">
            🔒
        </p>
      </div>
    </Link>
  );
};

export default Logo;
