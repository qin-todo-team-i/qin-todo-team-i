import Link from 'next/link';
import React from 'react';
import Drawer from 'src/components/Account/Drawer';
import { XIcon } from '@heroicons/react/solid';

const Account = () => {
	const drawerMenuContents = [
		{
			headline: '設定',
			menuItems: [
				{ item: 'プロフィール設定', path: '/account/profilesettings' },
				{ item: 'アカウント設定', path: '/account/accountsettings' },
				{
					item: 'テーマ',
					path: '/account/themesettings',
					selectedItem: 'OSの設定に合わせる',
				},
			],
		},
		{
			headline: 'サポート',
			menuItems: [
				{ item: 'プライバシーポリシー', path: '' },
				{ item: '利用規約', path: '' },
				{ item: 'オープンソースライセンス', path: '' },
			],
		},
	];

	return (
		<div className='px-8 py-4'>
			<div className='flex justify-between justify-items-center'>
				<span className='flex flex-col justify-center'>
					<XIcon className='w-5 h-5' />
				</span>
				<h1 className='text-lg'>アカウント</h1>
				<span></span>
			</div>
			{drawerMenuContents.map((drawerMenuContent) => {
				return (
					<>
						<Drawer menuContent={drawerMenuContent} />
					</>
				);
			})}
			<ul className='list-none font-bold relative'>
				<li className='mt-6'>
					<Link href='/'>お問い合わせ</Link>
				</li>
				<li className='mt-6'>
					バージョン<span className='absolute right-0'>1.0.0</span>
				</li>
			</ul>
		</div>
	);
};

export default Account;
