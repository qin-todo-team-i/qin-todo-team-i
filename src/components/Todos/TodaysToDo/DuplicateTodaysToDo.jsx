import React, { useCallback } from "react";
import { Button } from ".";
import { DuplicateIcon } from "@heroicons/react/outline";
import axios from "axios";
import { today } from ".";
import { format } from "date-fns";
import { tasksEndpoint } from ".";

export const DuplicateTodaysToDo = ({ tasks, index, getTasks }) => {
  const handleDuplicateTask = useCallback(
    async (index) => {
      await axios.post(`${tasksEndpoint}`, {
        sortId: tasks[index]?.sortId,
        task: tasks[index]?.task,
        limit: today,
        completed: false,
        completedAt: format(new Date("9999-12-31"), "yyyy-MM-dd"),
      });
      getTasks();
    },
    [tasks]
  );

  return (
    <Button
      type="button"
      onClick={() => handleDuplicateTask(index)}
      className="text-transparent w-full group-hover:text-gray"
    >
      <DuplicateIcon className="w-5 h-5" />
    </Button>
  );
};
