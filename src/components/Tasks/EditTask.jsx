import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Input } from "src/components/Input";
import { useTaskApi } from "src/hooks/useTaskApi";
import { tasksUrl } from "src/lib/TasksUrl";
import { tasksState } from "src/state/TasksState";

export const EditTask = ({ targetId, setTargetId }) => {
  const { handleSubmit, register, reset } = useForm();

  const [tasks, setTasks] = useRecoilState(tasksState);

  const task = tasks.find((task) => targetId === task.id);

  const { patchTask } = useTaskApi();
  const handleEditTask = useCallback(
    (targetTask) => {
      patchTask(`${tasksUrl}/${task.id}`, targetTask.taskText, setTasks);
      reset();
      outOfFocus();
    },
    [patchTask, setTasks, reset, outOfFocus]
  );

  const outOfFocus = useCallback(() => {
    setTargetId(undefined);
    reset();
  }, [setTargetId, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleEditTask)}
      className="flex items-center gap-x-2"
    >
      <span className="text-2xl text-gray">○</span>
      <Input
        name="taskText"
        register={register}
        defaultValue={task.task}
        outOfFocus={outOfFocus}
      />
    </form>
  );
};
