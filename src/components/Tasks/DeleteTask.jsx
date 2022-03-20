import { TrashIcon } from "@heroicons/react/outline";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Button } from "src/components/Button";
import { useTaskApi } from "src/hooks/useTaskApi";
import { tasksUrl } from "src/lib/TasksUrl";
import { tasksState } from "src/state/TasksState";

export const DeleteTask = ({ targetId }) => {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const task = tasks.find((task) => targetId === task.id);

  const { deleteTask } = useTaskApi();

  const handleRemoveTask = useCallback(() => {
    deleteTask(`${tasksUrl}/${task.id}`, setTasks);
  }, [deleteTask, setTasks]);

  return (
    <Button
      type="button"
      onClick={() => handleRemoveTask()}
      className="text-transparent w-full group-hover:text-gray"
    >
      <TrashIcon className="w-5 h-5" />
    </Button>
  );
};
