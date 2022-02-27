import { TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useCallback } from "react";
import { tasksEndpoint } from ".";
import { Button } from ".";

export const DeleteTodaysToDo = ({ tasks, index, getTasks }) => {
  const handleRemoveTask = useCallback(
    async (index) => {
      await axios.delete(`${tasksEndpoint}/${tasks[index]?.id}`);
      getTasks();
    },
    [tasks]
  );

  return (
    <Button
      type="button"
      onClick={() => handleRemoveTask(index)}
      className="text-transparent w-full group-hover:text-gray-400"
    >
      <TrashIcon className="w-5 h-5" />
    </Button>
  );
};
