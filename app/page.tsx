import PasswordGenerator from "./_components/PasswordGenerator";

const Page = () => {
  return (
    <div className="relative w-full h-full overflow-x-hidden flex flex-col px-2 gap-4 md:flex-row md:justify-between bg-gray-500 text-white">
      
      {/* Left Section: Text Info */}
      <div className="h-[40%] w-full relative pt-4 sm:px-12 md:h-full md:w-1/2 md:flex-center">
        <div className="w-full h-full relative flex-center">
          <div className="w-full relative flex flex-col gap-4">
            <h1 className="primary-font text-3xl sm:text-5xl">
              Secure, Strong, and Simple
            </h1>
            <h2 className="text-xl font-semibold font-sans sm:text-3xl">
              Try our free password generator and manager.
            </h2>
            <p className="secondary-font text-sm sm:text-xl">
              A powerful generator for powerful passwords to protect your online
              accounts. No more reusing weak passwords.
            </p>
            <p className="text-sm font-bold sm:text-lg">
              🔒 Your passwords are not stored anywhere until you explicitly save them in our encrypted database. We respect your privacy. No tracking, no ads, no logins required.
            </p>
            <div className="bg-green-600/20 border-l-4 border-green-500 p-3 rounded-md text-sm sm:text-base">
              <p className="font-semibold">💡 Security Tip:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use unique passwords for each website.</li>
                <li>Don’t share passwords via email or messages.</li>
                <li>Enable two-factor authentication where possible.</li>
                <li>Avoid using personal information in your passwords.</li>
              </ul>
            </div>
            <p className="text-xs text-gray-300 italic">
              Built for safety, built for you — by Biswajit Das 💻🔐
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Generator UI */}
      <div className="h-[60%] w-full relative p-2 sm:px-12 md:h-full md:w-1/2 md:flex">
        <div className="w-full h-full relative flex-center">
          <PasswordGenerator />
        </div>
      </div>
    </div>
  );
};

export default Page;
