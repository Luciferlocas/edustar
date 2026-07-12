"use client";

import React, { useState, FormEvent } from "react";
import Background from "@/components/Background";
import { Input, Button } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import { CutEye } from "@/components/CutEye";
import { Eye } from "@/components/Eye";

export default function Home() {
  const { login, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <main className="relative w-screen min-h-screen grid place-content-center overflow-hidden bg-black">
      <div className="animate-trans z-0 w-[14em] blur-2xl absolute md:top-[8%] -top-[4%] md:left-[10%] -left-[20%] aspect-square bg-primary-300 rounded-full opacity-15"></div>
      <div className="animate-trans2 z-0 w-[15em] blur-2xl absolute md:bottom-[15%] -bottom-[2%] md:right-[25%] -right-[5%] aspect-square bg-primary-300 rounded-full opacity-15"></div>

      <div className="w-screen min-h-screen z-20 flex justify-center items-center">
        <div className="absolute hue-rotate-180 opacity-50 sm:scale-100 scale-125 sm:-top-3/4 -top-1/2">
          <Background />
        </div>
        <div className="dark rounded-xl border-[0.5px] border-primary-700 py-24 sm:w-[25em] w-2/3 backdrop-blur-xl flex flex-col gap-8 text-white">
          <h1 className="text-3xl font-bold text-center drop-shadow-2xl">
            Login
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-10/12 mx-auto"
          >
            <Input
              isRequired
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              variant="bordered"
              labelPlacement="outside"
              label="Username"
              placeholder="Enter your edumarshal username"
            />
            <Input
              isRequired
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  aria-label={isVisible ? "Passwrod Hidden" : "Password visible"}
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? <CutEye /> : <Eye />}
                </button>
              }
              type={isVisible ? "text" : "password"}
              variant="bordered"
              labelPlacement="outside"
              label="Password"
              placeholder="Enter your password"
            />
            <Button
              className="w-full mt-8 font-bold"
              variant="flat"
              color="primary"
              type="submit"
              isDisabled={password.length === 0 || username.length === 0}
              isLoading={loading}
              aria-label={loading ? "Signing in..." : "Sign in"}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
