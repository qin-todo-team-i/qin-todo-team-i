import React from "react";
import { DuplicateIcon } from "@heroicons/react/outline";

export const DuplicateButton = (props) => {
  const { onClick } = props;

  return (
    <button onClick={onClick}>
      <DuplicateIcon className="text-gray w-6 h-6 cursor-pointer" />
    </button>
  );
};