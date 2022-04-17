import Link from "next/link";
import React from "react";

const Login = (toggleStatus) => {
  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center px-7">
        <img src="/logo.png" alt="logo" />
        <button
          onClick={toggleStatus}
          className="block w-full h-14 mt-9 bg-blue-600 rounded-3xl text-white max-w-xs"
        >
          <Link href="/">
            <a>ログイン</a>
          </Link>
        </button>
      </div>
    </>
  );
};
export default Login;
