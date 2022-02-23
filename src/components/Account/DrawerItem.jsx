import React from "react";
import Link from "next/link";

const DrawerItem = ({ item, selectedItem, path }) => {
	return (
		<>
			<li className='mt-6 flex justify-between'>
				<span>{item}</span>
				<span className='flex gap-x-10'>
					{selectedItem ? <span className=''>{selectedItem}</span> : null}
					<span>
						<Link href={path}>icon</Link>
					</span>
				</span>
			</li>
		</>
	);
};

export default DrawerItem;
