import PasswordGenerator from "./_components/PasswordGenerator";

const Page = () => {
  return (
    <div className="relative w-full h-full overflow-x-hidden flex flex-col  px-2  gap-1  md:flex-row md:flex-between ">
      <div className="h-[40%] w-full relative pt-1 sm:px-12 md:h-full md:w-1/2 md:flex-center">
        <div className="w-full h-full relative flex-center">
          <div className="w-full relative flex-center-column gap-2">
            <h1 className="primary-font sm:text-5xl">
              Secure, Strong, and Simple
            </h1>
            <h1 className="text-2xl font-semibold font-sans sm:text-3xl">
              Try, our free password generator and manager.
            </h1>
            <p className="secondary-font sm:text-xl">
              A powerful generator for powerful passwords to protect your online
              accounts.
            </p>
            <p className="text-sm font-bold sm:text-lg">
              Your password not stored anywhere until you save it in our
              database. we have no idea who you are
            </p>
          </div>
        </div>
      </div>

      <div className="h-[60%] w-full relative p-2 sm:px-12 md:h-full md:w-1/2 md:flex">
        <div className="w-full h-full relative flex-center">
          <PasswordGenerator />
        </div>
      </div>
    </div>
  );
};

export default Page;
