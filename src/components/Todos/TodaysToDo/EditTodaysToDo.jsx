import axios from "axios";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { tasksEndpoint } from ".";
import { Input } from ".";

export const EditTodaysToDo = ({
  isOpenEdit,
  setIsOpenEdit,
  task,
  getTasks,
}) => {
  const { handleSubmit, register, reset } = useForm();

  const handleEditTask = useCallback(
    async (editData) => {
      await axios.patch(`${tasksEndpoint}/${isOpenEdit}`, {
        task: editData.editTask,
      });
      getTasks();
      reset();
      outOfFocus();
    },
    [isOpenEdit]
  );

  const outOfFocus = () => {
    setIsOpenEdit(undefined);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditTask)}
      className="flex items-center gap-x-2"
    >
      <span className="text-2xl text-gray">○</span>
      <Input
        name="editTask"
        register={register}
        defaultValue={task.task}
        outOfFocus={outOfFocus}
      />
    </form>
  );
};
