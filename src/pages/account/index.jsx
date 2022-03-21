import Link from "next/link";
import React from "react";
import Drawer from "src/components/Account/Drawer";
import { XIcon, CogIcon, LogoutIcon } from "@heroicons/react/solid";
import { AccountLayout } from "src/layouts/AccountLayout";

const Account = () => {
  const drawerMenuContents = [
    {
      headline: "設定",
      menuItems: [
        { item: "プロフィール設定", path: "/account/profilesettings" },
        { item: "アカウント設定", path: "/account/accountsettings" },
        {
          item: "テーマ",
          path: "/account/themesettings",
          selectedItem: "OSの設定に合わせる",
        },
      ],
    },
    {
      headline: "サポート",
      menuItems: [
        { item: "プライバシーポリシー", path: "/support/privacy-policy" },
        { item: "利用規約", path: "/support/terms" },
        { item: "オープンソースライセンス", path: "" },
      ],
    },
  ];

  return (
    <div className="px-4 relative">
      <div className="py-4 max-w-2xl mx-auto flex flex-col gap-12">
        {drawerMenuContents.map((drawerMenuContent) => {
          return (
            <>
              <Drawer menuContent={drawerMenuContent} />
            </>
          );
        })}
      </div>
    </div>
  );
};

const title = "設定";
Account.getLayout = (page) => AccountLayout(page, title);

export default Account;
