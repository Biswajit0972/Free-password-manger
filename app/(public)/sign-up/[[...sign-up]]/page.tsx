import Loading from "@/app/loading";
import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="h-full w-full flex-center">
      <Suspense fallback={<Loading />}>
        <SignUp />
      </Suspense>
    </div>
  );
}
