"use client";

import React, { useState } from "react";
import Background from "@/components/Background";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const grant_type = "password";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const user = target.username.value;
    const password = target.password.value;

    await login(user, password);
  };

  const login = async (user: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`https://beta.edumarshal.com/Token`, {
        grant_type: grant_type,
        user,
        password,
      });
      console.log(response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative w-screen min-h-screen grid place-content-center overflow-hidden">
      <div className="z-0 w-[20em] absolute md:top-[8%] -top-[4%] md:left-[10%] -left-[20%] aspect-square bg-yellow-600 rounded-full opacity-15"></div>
      <div className="z-0 w-[15em] absolute md:bottom-[18%] -bottom-[2%] md:right-[20%] -right-[5%] aspect-square bg-rose-600 rounded-full opacity-15"></div>
      <div className="fixed w-screen min-h-screen backdrop-blur-3xl z-10"></div>

      <div className="w-screen min-h-screen z-20 flex justify-center items-center">
        <div className="absolute hue-rotate opacity-50">
          <Background />
        </div>
        <div className="rounded-xl border-[0.5px] border-l-yellow-300 border-t-yellow-300 border-b-orange-500 border-r-orange-500 sm:py-24 py-12 sm:w-[25em] w-2/3 backdrop-blur-2xl flex flex-col gap-8">
          <h1 className="text-3xl font-bold text-center drop-shadow-2xl">
            Login
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-10/12 mx-auto"
          >
            <Input
              isRequired
              name="username"
              variant="bordered"
              labelPlacement="outside"
              label="Username"
              placeholder="Enter your username"
            />
            <Input
              isRequired
              name="password"
              type="password"
              variant="bordered"
              labelPlacement="outside"
              label="Password"
              placeholder="Enter your password"
            />
            <Button
              className="w-full"
              variant="flat"
              color="primary"
              type="submit"
              isLoading={loading}
            >
              Sign in
            </Button>
            <p className="text-right sm:text-sm text-xs mt-[1em]">
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
