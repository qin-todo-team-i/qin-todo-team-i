import React from "react";
import { Button } from ".";

export const TodaysToDoList = ({ task, setIsOpenEdit }) => {
  return (
    <Button
      type="button"
      disabled={task.completed}
      onClick={() => setIsOpenEdit(task.id)}
      className={`text-left ${
        task.completed ? "text-gray line-through" : "text-black"
      }`}
    >
      {task.task}
    </Button>
  );
};
