
import Loading from "@/app/loading";
import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="h-full w-full flex-center">
      <Suspense fallback={<Loading/>}>
        <SignIn />
      </Suspense>
    </div>
  );
}
