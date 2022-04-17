import Link from "next/link";
import React, { useState } from "react";
import Home from "src/components/Home";

const page = () => {
  const [userLogin, setUserLogin] = useState(false);

  return (
    <>
      {userLogin ? (
        <Home />
      ) : (
        <>
          <div className="h-screen w-screen flex flex-col justify-center items-center px-7">
            <img src="/logo.png" alt="logo" />
            <button
              onClick={() => setUserLogin(!userLogin)}
              className="block w-full h-14 mt-9 bg-blue-600 rounded-3xl text-white max-w-xs"
            >
              <Link href="/">
                <a>ログイン</a>
              </Link>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default page;
