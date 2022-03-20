import { DuplicateIcon } from "@heroicons/react/outline";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Button } from "src/components/Button";
import { useTaskApi } from "src/hooks/useTaskApi";
import { tasksState } from "src/state/TasksState";

export const DuplicateTask = ({ targetId }) => {
  const [tasks, setTasks] = useRecoilState(tasksState);

  const task = tasks.find((task) => targetId === task.id);

  const { duplicateTask } = useTaskApi();

  const handleDuplicateTask = useCallback(() => {
    duplicateTask(task.task, task.limit, task.createdAt, setTasks);
  }, [duplicateTask, setTasks]);

  return (
    <Button
      type="button"
      onClick={() => handleDuplicateTask()}
      className="text-transparent w-full group-hover:text-gray"
    >
      <DuplicateIcon className="w-5 h-5" />
    </Button>
  );
};
