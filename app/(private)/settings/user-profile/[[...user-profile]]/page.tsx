import { UserProfile } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full flex-center relative ">
      <UserProfile />
    </div>
  );
};

export default page;
