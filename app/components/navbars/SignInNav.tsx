"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const SignInNav = () => {
  const pathname = usePathname();
  const inSignInPage = pathname.startsWith("/sign-in");

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-2xl">
          <span className="text-black">Resto</span>
          <span className="text-red-500 -ml-2">MTL</span>
        </Link>
      </div>
      {!inSignInPage && (
        <div className="navbar-end">
          <Link href="/sign-in" className="btn">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default SignInNav;
