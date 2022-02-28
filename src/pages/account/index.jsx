import Link from 'next/link';
import React from 'react';
import Drawer from 'src/components/Account/Drawer';
import { XIcon, CogIcon, LogoutIcon } from '@heroicons/react/solid';
import { Layout } from 'src/layouts/Layout';

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
		<Layout>
			<div className='px-4 relative'>
				<div className='py-4 max-w-2xl mx-auto'>
					<div className='flex justify-between justify-items-center lg:hidden'>
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
						<li className='mt-6 flex justify-between'>
							<span>バージョン</span>
							<span>1.0.0</span>
						</li>
					</ul>
				</div>
				{/* ドロップダウンメニューの絶対位置(right)の数式について、3つの変数のいずれかを変更すると変更が必要
                    1.Headerのロゴ→ユーザーアイコンまでに指定したmax-widthが64rem=1024px(変数①)。ビューポートの横幅から1024pxを引いてから2で割ると、左右の余白の1つ分の横幅になり、アイコン右端とドロップダウンメニュー右端が一致する値になる
                    2.ドロップダウンメニューの横幅がビューポートの6分の1(変数②)指定のため、半分の12で割ると、ドロップダウンメニューの半分の横幅がわかる。その値を2の値から引くことで、ドロップダウンメニューの中心がアイコン右端に揃う
                    3.最後にアイコンの横幅36px(変数③)の半分の18pxを足すと、ドロップダウンメニューの中心とアイコンの”中心”が揃う
                */}
				<ul className='hidden lg:flex absolute top-0 right-[max(calc((((100vw-1024px)/2)-calc(100vw/12))+18px),0px)] w-1/6 py-1 flex-col border rounded-xl drop-shadow-sm'>
					<Link href='/'>
						<li className='flex items-center gap-x-3 px-4 py-2 hover:bg-gray-100'>
							<span>
								<CogIcon className='w-5 h-5' />
							</span>
							<span>設定</span>
						</li>
					</Link>
					<li className='flex items-center gap-x-3 px-4 py-2 text-red-500 hover:bg-gray-100'>
						<span>
							<LogoutIcon className='w-5 h-5' />
						</span>
						<span>ログアウト</span>
					</li>
				</ul>
			</div>
		</Layout>
	);
};

export default Account;
