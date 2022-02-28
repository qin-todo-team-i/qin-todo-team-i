import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';

const DrawerItem = ({ item, selectedItem, path }) => (
	<>
		<li className='mt-6 flex justify-between items-center'>
			<span>{item}</span>
			<span className='flex items-center'>
				{selectedItem ? <span className='pr-4'>{selectedItem}</span> : null}
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
