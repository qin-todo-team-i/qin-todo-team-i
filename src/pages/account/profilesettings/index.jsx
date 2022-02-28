import React from 'react';
import { Layout } from 'src/layouts/Layout';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

const Profile = () => {
	return (
		<Layout>
			<div className='max-w-2xl mx-auto px-6'>
				<div className='lg:hidden flex items-center relative justify-between gap-x-6 mb-8'>
					<ChevronLeftIcon className='w-6 h-6' />
					<h1 className='text-lg font-bold'>プロフィール設定</h1>
					<span></span>
				</div>
				<div className='hidden lg:block'>
					<ul className='flex items-center gap-x-8 text-sm font-bold mb-4'>
						<li>ホーム</li>
						<ChevronRightIcon className='w-4 h-4 text-gray-400' />
						<li>プロフィール</li>
					</ul>
					<h1 className='text-3xl font-bold mb-8'>プロフィール</h1>
				</div>
				<form action=''>
					<label className='text-gray-400 font-bold text-sm'>アイコン</label>
					<div className='flex items-center gap-x-4 mt-2 mb-9'>
						<Image
							src='/person.png'
							alt=''
							width='100'
							height='100'
							className='h-auto aspect-square'
						/>
						<button className='px-4 py-2 bg-gray-100 rounded-2xl text-xs font-bold'>
							変更する
						</button>
					</div>
					<label className='text-gray-400 font-bold text-sm' htmlFor='name'>
						名前
					</label>
					<input
						className='block w-full h-11 px-4 mt-1 bg-gray-100 rounded-xl'
						type='text'
						name='name'
						id='name'
						placeholder='しまぶー'
					/>
					<button className='block w-full h-14 mt-9 bg-blue-600 rounded-3xl text-white'>
						保存する
					</button>
				</form>
			</div>
		</Layout>
	);
};

export default Profile;
