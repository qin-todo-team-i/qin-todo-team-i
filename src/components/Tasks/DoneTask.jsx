import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Button } from "src/components/Button";
import { useTaskApi } from "src/hooks/useTaskApi";
import { tasksUrl } from "src/lib/TasksUrl";
import { tasksState } from "src/state/TasksState";

export const DoneTask = ({ targetId, limit }) => {
  const [tasks, setTasks] = useRecoilState(tasksState);

  const task = tasks.find((task) => targetId === task.id);

  const { doneTask } = useTaskApi();
  const handleDoneTask = useCallback(() => {
    doneTask(`${tasksUrl}/${task.id}`, task.done, setTasks);
  }, [doneTask, setTasks]);

  return (
    <Button
      onClick={() => handleDoneTask()}
      type="button"
      className={`check-button ${
        task.done ? `check-button-is-done check-button-is-done-${limit}` : ""
      }`}
    >
      ○
    </Button>
  );
};
