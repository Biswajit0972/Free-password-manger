import { useState } from "react";
import Image from "next/image";
import demoImg from "@/public/download (2).gif";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { EncryptionResponse, passwordForm } from "../_utils";
import { useApplicationcontext } from "../_context/Context";
import { useCreatePassword, useGetUserData } from "../_utils/hooks";
import { useAuth } from "@clerk/nextjs";
import { decryptSessionKey } from "../_utils/functions/keyGen";
import { useCryptoContext } from "../_context/CryptoProvider";
import { encryptData } from "../_utils/functions/keyHelper";
import { IPassword } from "../_lib/models/password/password.model";

const PasswordForm = () => {
  const {
    state: { password },
  } = useApplicationcontext();
  const [icon, setIcon] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordForm>({
    defaultValues: {
      applicationLink: "",
      username: "",
      password: password.length > 0 ? password : "",
    },
  });
  const { userId } = useAuth();
  const { error, mutateAsync: getUser } = useGetUserData();
  const { mutateAsync: createPassword, error: createError } =
    useCreatePassword();
  const { derivedKey } = useCryptoContext();
  if (error) {
    console.error("Error fetching user data:", error);
  }

  const onSubmit = async (data: passwordForm) => {
    const { applicationLink, username, password } = data;
    const user: EncryptionResponse = await getUser(userId!.split("_")[1]);

    if (!user.data._id) {
      console.error("User ID not found in response data");
      return;
    }

    const enIv = user.data.EnIvKey;
    const dataEnkey = await decryptSessionKey(derivedKey!, enIv);

    if (!dataEnkey) {
      console.error("Failed to decrypt session key");
      return;
    }

    const enDataIv = user.data.EnIvData;

    const { cipherText, iv } = await encryptData(password, dataEnkey, enDataIv);

    if (!cipherText || !iv) {
      console.error("Failed to encrypt password data");
      return;
    }

    const passwordObj = {
      user_id: user.data._id,
      username,
      application_link: applicationLink,
      password_obj: {
        password: cipherText,
        iv: enDataIv,
      },
    } as IPassword;

    await createPassword(passwordObj);

    if (createError) {
      console.log(createError.message);
      return;
    }
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
              src={
                icon.length > 3
                  ? `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${icon}&size=128`
                  : demoImg
              }
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
