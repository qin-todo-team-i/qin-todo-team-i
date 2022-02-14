import React from "react";
import { Header } from "src/components/Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <Header />
      </header>

      <main>{children}</main>
    </div>
  );
};
