import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-dark-3">
      <div className="flex-1 h-full flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
}
