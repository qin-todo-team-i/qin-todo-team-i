import React from "react";
import { AccountHeader } from "src/components/AccountHeader";

export const AccountLayout = (page, title) => {
  return (
    <div>
      <header>
        <AccountHeader title={title} />
      </header>
      <main className="max-w-5xl mx-auto px-6 py-6 ">{page}</main>
    </div>
  );
};
