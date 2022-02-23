import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';

const DrawerItem = ({ item, selectedItem, path }) => (
	<>
		<li className='mt-6 flex justify-between'>
			<span>{item}</span>
			<span className='flex gap-x-10'>
				{selectedItem ? <span className=''>{selectedItem}</span> : null}
				<span>
					<Link href={path}>
						<ChevronRightIcon className='w-5 h-5 text-gray-400' />
					</Link>
				</span>
			</span>
		</li>
	</>
);

export default DrawerItem;
