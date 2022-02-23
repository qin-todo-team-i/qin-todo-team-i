import React from "react";
import Link from "next/link";
import DrawerItem from "./DrawerItem";

const Drawer = () => {
	return (
		<>
			<h2 className='text-gray-400 text-sm'>設定</h2>
			<ul className='list-none relative font-bold'>
				<DrawerItem item='プロフィール設定' path='/account/profilesettings' />
				<DrawerItem item='アカウント設定' path='/account/accountsettings' />
				<DrawerItem item='テーマ' path='/account/themesettings' />
			</ul>
		</>
	);
};

export default Drawer;
