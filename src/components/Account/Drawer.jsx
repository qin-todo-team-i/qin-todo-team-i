import React from "react";
import DrawerItem from "./DrawerItem";

const Drawer = ({ menuContent }) => {
	const menuItems = menuContent.menuItems;

	return (
		<div className='mt-12'>
			<h2 className='text-gray-400 text-sm'>{menuContent.headline}</h2>
			<ul className='list-none relative font-bold'>
				{menuItems.map((menuItem) => {
					return (
						<>
							<DrawerItem
								item={menuItem.item}
								path={menuItem.path}
								selectedItem={
									menuItem.selectedItem ? menuItem.selectedItem : null
								}
							/>
						</>
					);
				})}
			</ul>
		</div>
	);
};

export default Drawer;
