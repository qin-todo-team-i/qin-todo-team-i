import React from "react";
import { Button } from "src/components/Button";

export const TaskList = ({ task, setTargetId }) => {
  return (
    <Button
      type="button"
      disabled={task.done}
      onClick={() => setTargetId(task.id)}
      className={`text-left ${
        task.done ? "text-gray line-through" : "text-black"
      }`}
    >
      <span className="line-clamp-4">{task.task}</span>
    </Button>
  );
};
