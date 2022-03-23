import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/outline";

const DrawerItem = ({ item, selectedItem, path }) => (
  <>
    <Link href={path}>
      <a href={path}>
        <li className="mt-6 flex justify-between items-center cursor-pointer">
          <span>{item}</span>
          <span className="flex items-center">
            {selectedItem ? <span className="pr-4">{selectedItem}</span> : null}
            <span>
              <ChevronRightIcon className="w-5 h-5 text-gray" />
            </span>
          </span>
        </li>
      </a>
    </Link>
  </>
);

export default DrawerItem;
