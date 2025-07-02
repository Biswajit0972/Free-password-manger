import PasswordGenerator from "./_components/PasswordGenerator";

const Page = () => {
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
        <PasswordGenerator />
      </div>
    </div>
  );
};

export default Page;
