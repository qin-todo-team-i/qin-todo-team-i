import { PlusCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, tasksEndpoint, today } from ".";

export const AddTodaysToDo = ({ tasks, getTasks }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const { handleSubmit, register, reset } = useForm();

  const handleAddTask = useCallback(
    async (addData) => {
      await axios.post(`${tasksEndpoint}`, {
        sortId: tasks.length,
        task: addData.addTask,
        limit: today,
        completed: false,
        completedAt: format(new Date("9999-12-31"), "yyyy-MM-dd"),
      });
      getTasks();
      reset();
    },
    [tasks]
  );

  const outOfFocus = () => {
    setIsOpenAdd(false);
    reset();
  };

  return (
    <div>
      {isOpenAdd ? (
        // タスク入力状態
        <form
          onSubmit={handleSubmit(handleAddTask)}
          className="flex items-center"
        >
          <p className="mr-2 text-2xl text-gray-400">○</p>
          <Input name="addTask" register={register} outOfFocus={outOfFocus} />
        </form>
      ) : (
        // タスク追加ボタン（クリックでタスク入力状態へ移行）
        <Button
          type="button"
          onClick={() => setIsOpenAdd(true)}
          className="text-gray-400 w-full gap-x-2 text-left flex items-center"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span>タスクを追加する</span>
        </Button>
      )}
    </div>
  );
};
