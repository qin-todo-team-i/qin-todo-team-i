import React from "react";
import Drawer from "src/components/Account/Drawer";
import { AccountLayout } from "src/layouts/AccountLayout";

const Account = () => {
  const drawerMenuContents = [
    {
      key: "account",
      headline: "設定",
      menuItems: [
        { key: "profilesettings", item: "プロフィール設定", path: "/account/profilesettings" },
        { key: "accountsettings", item: "アカウント設定", path: "/account/accountsettings" },
        {
          key: "themesettings",
          item: "テーマ",
          path: "/account/themesettings",
          selectedItem: "OSの設定に合わせる",
        },
      ],
    },
    {
      key: "support",
      headline: "サポート",
      menuItems: [
        { key: "privacy-policy", item: "プライバシーポリシー", path: "/support/privacy-policy" },
        { key: "terms", item: "利用規約", path: "/support/terms" },
        { key: "license", item: "オープンソースライセンス", path: "/account" },
      ],
    },
  ];

  return (
    <div className="px-4 relative">
      <div className="py-4 max-w-2xl mx-auto flex flex-col gap-12">
        {drawerMenuContents.map((drawerMenuContent) => {
          return <Drawer key={drawerMenuContent.key} menuContent={drawerMenuContent} />;
        })}
      </div>
    </div>
  );
};

const title = "設定";
const isTopLevel = true;
Account.getLayout = (page) => AccountLayout(page, title, isTopLevel);

export default Account;
