import { BACKEND_URL } from "@/config";
import React from "react";

const SignInBox = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      {" "}
      <div className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900">
          Resto<span className="text-red-500">MTL</span>
        </h1>
        <p className="mt-4 text-gray-600">Sign in to continue to RestoMTL</p>

        <a
          href={`${BACKEND_URL}/oauth2/authorization/google`}
          className="mt-6 w-full py-3 bg-black text-white rounded-full flex items-center justify-center space-x-3"
        >
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Icon"
            className="w-6 h-6"
          />
          <span>Sign In with Google</span>
        </a>
      </div>
    </div>
  );
};

export default SignInBox;
