import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import { Layout } from "src/layouts/Layout";
import ConfirmDialog from "src/components/Dialog/ConfirmDialog";

const AccountSettings = () => {
  const [isConfirmLogoutDialogOpen, setIsConfirmLogoutDialogOpen] = useState(false);
  const [isConfirmDeleteAccountDialogOpen, setIsConfirmDeleteAccountDialogOpen] = useState(false);

  const openConfirmLogoutDialog = () => {
    setIsConfirmLogoutDialogOpen(true);
  };
  const closeConfirmLogoutDialog = () => {
    setIsConfirmLogoutDialogOpen(false);
  };
  const openConfirmDeleteAccountDialog = () => {
    setIsConfirmDeleteAccountDialogOpen(true);
  };
  const closeConfirmDeleteAccountDialog = () => {
    setIsConfirmDeleteAccountDialogOpen(false);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-6">
        <div className="lg:hidden flex items-center relative justify-between gap-x-6 mb-8">
          <ChevronLeftIcon className="w-6 h-6" />
          <h1 className="text-lg font-bold">アカウントの連携</h1>
          <span></span>
        </div>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-x-8 text-sm font-bold mb-4">
            <li>ホーム</li>
            <ChevronRightIcon className="w-4 h-4 text-gray" />
            <li>アカウントの連携</li>
          </ul>
          <h1 className="text-3xl font-bold mb-8">アカウントの連携</h1>
        </div>

        <section className="mb-14">
          <ul className="">
            <li className="flex justify-between items-center mb-3">
              <span className="inline-flex items-center gap-3">
                <Image
                  src="/icon_google.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <span>Goole</span>
              </span>
              <button className="block px-6 py-2 bg-slate-100 rounded-3xl text-black">
                解除する
              </button>
            </li>
            <li className="flex justify-between items-center">
              <span className="inline-flex items-center gap-3">
                <Image
                  src="/icon_apple.svg"
                  alt="logo"
                  width={24}
                  height={24}
                />
                <span>Apple</span>
              </span>
              <button className="block px-6 py-2 bg-blue-600 rounded-3xl text-white">
                連携する
              </button>
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-slate-200 font-bold mb-5">アカウントの操作</h2>
          <ul>
            <li className="mb-5">

              <span className="text-red-500 font-bold cursor-pointer" onClick={openConfirmLogoutDialog}>

                ログアウト
              </span>
            </li>
            <li className="">

              <span className="text-red-500 font-bold cursor-pointer" onClick={openConfirmDeleteAccountDialog}>

                アカウントの削除
              </span>
            </li>
          </ul>
        </section>
      </div>
      <ConfirmDialog
        title="ログアウト"
        message="ログアウトしてよろしいですか？"
        isConfirmDialogOpen={isConfirmLogoutDialogOpen}
        onClickSubmit={() => {}}
        onClickCancel={closeConfirmLogoutDialog}
        onClose={closeConfirmLogoutDialog}
      />
      <ConfirmDialog
        title="アカウントの削除"
        message="アカウントを完全に削除してよろしいですか？"
        isConfirmDialogOpen={isConfirmDeleteAccountDialogOpen}
        onClickSubmit={() => {}}
        onClickCancel={closeConfirmDeleteAccountDialog}
        onClose={closeConfirmDeleteAccountDialog}
      />
    </Layout>
  );
};

export default AccountSettings;
