import React from "react";
import { AccountHeader } from "src/components/AccountHeader";

export const AccountLayout = (page, title) => {
  return (
    <div>
      <header>
        <AccountHeader title={title} />
      </header>
      <main>{page}</main>
    </div>
  );
};
