import { PlusCircleIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Button } from "src/components/Button";
import { Input } from "src/components/Input";
import { useTaskApi } from "src/hooks/useTaskApi";
import { today } from "src/lib/Today";
import { tomorrow } from "src/lib/Tomorrow";
import { tasksState } from "src/state/TasksState";

export const AddTask = ({ limit }) => {
  const { handleSubmit, register, reset } = useForm();
  const setTasks = useSetRecoilState(tasksState);

  // タスク入力状態の切り替え
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleOpenAdd = useCallback(() => {
    setIsOpenAdd(true);
  }, [setIsOpenAdd]);

  // タスク追加のメソッド
  const { postTask } = useTaskApi();
  const handleAddTask = useCallback(
    (taskText) => {
      postTask(
        taskText.taskText,
        limit === "today"
          ? today
          : limit === "tomorrow"
          ? tomorrow
          : limit === "nextTime"
          ? format(new Date("9999-12-31"), "yyyy-MM-dd")
          : null,
        setTasks
      );
      reset();
    },
    [postTask, setTasks, reset]
  );

  const outOfFocus = useCallback(() => {
    setIsOpenAdd(false);
    reset();
  }, [setIsOpenAdd, reset]);

  return (
    <div>
      {isOpenAdd ? (
        // タスク入力状態
        <form
          onSubmit={handleSubmit(handleAddTask)}
          className="flex items-center"
        >
          <p className="mr-2 text-2xl text-gray">○</p>
          <Input name="taskText" register={register} outOfFocus={outOfFocus} />
        </form>
      ) : (
        // タスク追加ボタン（クリックでタスク入力状態へ移行）
        <Button
          type="button"
          onClick={handleOpenAdd}
          className="text-gray w-full gap-x-2 text-left flex items-center"
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span>タスクを追加する</span>
        </Button>
      )}
    </div>
  );
};
