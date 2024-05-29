import Background from "@/components/Background";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative w-screen min-h-screen grid place-content-center overflow-hidden">
      <div className="z-0 w-[20em] absolute md:top-[8%] -top-[4%] md:left-[10%] -left-[20%] aspect-square bg-blue-600 rounded-full opacity-10"></div>
      <div className="z-0 w-[15em] absolute md:bottom-[18%] -bottom-[2%] md:right-[20%] -right-[5%] aspect-square bg-rose-600 rounded-full opacity-10"></div>
      <div className="fixed w-screen min-h-screen backdrop-blur-3xl z-10"></div>

      <div className="w-screen min-h-screen z-20 flex justify-center items-center">
        <div className="absolute hue-rotate-90 opacity-50">
          <Background />
        </div>
        <div className="rounded-xl border-[0.5px] border-rose-200 py-24 sm:w-[25em] w-2/3 backdrop-blur-2xl flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-center drop-shadow-2xl">
            Login
          </h1>
          <form action="submit" className="flex flex-col gap-4 w-10/12 mx-auto">
            <Input
              variant="bordered"
              labelPlacement="outside"
              label="Username"
              placeholder=" "
            />
            <Input
              variant="bordered"
              labelPlacement="outside"
              label="Password"
              placeholder=" "
            />
            <Button className="w-full" variant="flat" color="primary">
              Sign in
            </Button>
            <p className="text-right text-sm mt-[1em]">
              Forgot password?{" "}
              <Link href="" className="text-rose-600 underline">
                Click Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
