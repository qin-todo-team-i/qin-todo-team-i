import axios from "axios";
import { format } from "date-fns";
import React, { useCallback } from "react";
import { tasksEndpoint } from ".";
import { today } from ".";
import { Button } from ".";

export const CompletedTodaysToDo = ({ task, tasks, index, getTasks }) => {
  const handleCompletedTask = useCallback(
    async (index) => {
      await axios.patch(`${tasksEndpoint}/${tasks[index]?.id}`, {
        completed: !tasks[index]?.completed,
        completedAt: tasks[index]?.completed
          ? format(new Date("9999-12-31"), "yyyy-MM-dd")
          : today,
      });
      getTasks();
    },
    [tasks]
  );

  return (
    <Button
      onClick={() => handleCompletedTask(index)}
      type="button"
      className={`relative w-auto text-2xl text-gray ${
        task.completed
          ? "after:content-['●'] after:text-sm after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-primary"
          : ""
      }`}
    >
      ○
    </Button>
  );
};
