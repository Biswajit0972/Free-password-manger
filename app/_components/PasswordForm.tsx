"use client";

import {  useState } from "react";
import Image from "next/image";
import demoImg from "@/public/download (2).gif";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { passwordForm } from "../_utils";

const PasswordForm = () => {
  const [icon, setIcon] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordForm>();

  const onSubmit = (data: passwordForm) => {
    console.log(data);
  };

  
  

  return (
    <div className="w-[95%] absolute bottom-8 left-1/2 -translate-x-1/2  p-4 bg-white rounded-lg shadow-lg z-10">
      <form
        className="relative w-full flex-center-column gap-3 px-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="secondary-font font-bold mb-2">Add New Password</h1>

        <div className="Application-icon w-full h-12  flex-center relative">
          <div className="w-12 h-full relative  rounded-2xl overflow-hidden ">
            <Image
              src={icon.length > 3 ? `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${icon}&size=128` : demoImg}
              alt="application-img"
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>
        </div>
        {/* form start here */}

        {/* Application Link */}
        <div className="w-full relative">
          <Input
            inputClassName="w-full bg-transparent px-4 outline-none border rounded-full h-8 text-sm  font-semibold"
            type="text"
            {...register("applicationLink", {
              required: "Application link is mandatory",
            })}
            placeholder="ex: google.com"
            onChange={(e) => setIcon(e.currentTarget.value)}
          />
          {errors.applicationLink && (
            <p className="text-xs text-red-500 pl-3 mt-1">
              {errors.applicationLink?.message}
            </p>
          )}
        </div>
        {/* Username */}
        <div className="w-full relative">
          <Input
            inputClassName="w-full bg-transparent px-4 outline-none border rounded-full h-8 text-sm  font-semibold "
            type="text"
            {...register("username", { required: "username is mandatory" })}
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-xs text-red-500 pl-3 mt-1">
              {errors.username?.message}
            </p>
          )}
        </div>
        {/* Password */}
        <div className="w-full relative">
          <Input
            inputClassName="w-full bg-transparent px-4 outline-none border rounded-full h-8 text-sm  font-semibold "
            type="text"
            {...register("password", { required: "password is mandatory" })}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-xs text-red-500 pl-3 mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>
        <button className="w-full bg-green-500 text-white font-semibold rounded-full h-8 cursor-pointer hover:bg-green-600 transition-colors duration-300">
          Add Password
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
