import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="cursor-pointer h-full w-14">
      <div className=" h-full w-full relative bg-green-500 rounded-full flex-center">
        <p className="text-2xl font-bold text-white">FP</p>
      </div>
    </Link>
  );
};

export default Logo;
