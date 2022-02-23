import React from "react";
import Drawer from "src/components/Account/Drawer";

const Account = () => {
	return (
		<div className='px-8 py-4'>
			<span className='absolute'>icon</span>
			<h1 className='text-center text-lg'>アカウント</h1>

			<div className='mt-12'>
				<Drawer />
			</div>

			<div className='mt-12'>
				<Drawer />
			</div>
			<ul className='list-none font-bold relative'>
				<li className='mt-6'>お問い合わせ</li>
				<li className='mt-6'>
					バージョン<span className='absolute right-0'>1.0.0</span>
				</li>
			</ul>
		</div>
	);
};

export default Account;
