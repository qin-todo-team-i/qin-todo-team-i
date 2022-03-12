import React from "react";
import { TrashIcon } from "@heroicons/react/outline";

export const DeleteButton = (props) => {
  const { onClick } = props;

  return (
    <button onClick={onClick}>
      <TrashIcon className="text-gray w-6 h-6 cursor-pointer" />
    </button>
  );
};
