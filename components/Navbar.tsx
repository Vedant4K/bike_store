"use client"

import Link from "next/link";
import Image from "next/image";

import CustomButton from "./CustomButton";
import { UserButton, useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const NavBar = () => {
  const {isSignedIn} = useAuth();
  const { user } = useUser();

  return (
    <header className="w-full  absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center gap-4 font-extrabold text-3xl text-primary-blue">
          <Image
            src="/bike_logo.svg"
            alt="logo"
            width={75}
            height={4}
            className="object-contain"
          />
          MotoBlaze
        </Link>

        {isSignedIn ? (
          <div className="flex items-center justify-center gap-4 py-2 px-4 rounded-md font-bold text-lg bg-stone-200">{user?.firstName}<UserButton /></div>
        ) : (
          <Link href="/sign-in">
            <CustomButton
              title="Sign in"
              btnType="button"
              containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
