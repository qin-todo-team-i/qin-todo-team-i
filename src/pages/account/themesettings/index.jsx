import React from "react";
import { AccountLayout } from "src/layouts/AccountLayout";

const Theme = () => {
  return (
    <>
      <div className="px-4 relative">
        <div className="py-4 max-w-2xl mx-auto flex flex-col gap-6 font-bold">
          <span>端末の設定に合わせる</span>
          <span>ライト</span>
          <span>グレー</span>
        </div>
      </div>
    </>
  );
};

const title = "テーマ";
Theme.getLayout = (page) => AccountLayout(page, title);

export default Theme;
