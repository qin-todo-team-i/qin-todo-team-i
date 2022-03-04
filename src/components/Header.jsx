import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export const Header = () => {
  const PATH_ACCOUNT_ACCOUNTSETTINGS = "/account/accountsettings";
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto flex justify-between items-center h-20">
      {router.pathname === PATH_ACCOUNT_ACCOUNTSETTINGS ? (
        <Image src="/logo_account.png" alt="logo" width={173} height={24} />
      ) : (
        <Link href="/">
          <a>
            <Image src="/logo.png" alt="logo" width={168} height={36} />
          </a>
        </Link>
      )}

      <Link href="/account">
        <a>
          <Image src="/person.png" alt="logo" width={36} height={36} />
        </a>
      </Link>
    </div>
  );
};
