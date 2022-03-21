import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/outline";

const DrawerItem = ({ item, selectedItem, path }) => (
  <>
    <li className="">
      <Link href={path}>
        <a className="flex justify-between items-center py-3">
          <span>{item}</span>
          <span className="flex items-center">
            {selectedItem ? <span className="pr-4">{selectedItem}</span> : null}
            <ChevronRightIcon className="w-5 h-5 text-gray" />
          </span>
        </a>
      </Link>
    </li>
  </>
);

export default DrawerItem;
