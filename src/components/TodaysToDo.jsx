import { DuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// inputコンポーネント
const Input = ({ name, register, outOfFocus, defaultValue }) => (
  <input
    {...register(name, { required: true })}
    type="text"
    autoFocus
    defaultValue={defaultValue}
    onBlur={outOfFocus}
    className="caret-primary outline-none rounded w-full"
  />
);

// buttonコンポーネント
const Button = ({ children, type, disabled, onClick, className }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`w-full ${className}`}
  >
    {children}
  </button>
);

const today = format(new Date(), "yyyy-MM-dd");

export const TodaysToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(undefined);

  // react-hook-formを使ったフォームバリデーション
  const { handleSubmit, register, reset } = useForm();

  // サーバーから ToDo リストを取得する処理
  const getTasks = useCallback(async () => {
    await axios
      .get(
        // 期限が今日以前かつ完了日時が今日以降（今日ではない：日付が変わったら取得しない）のタスク
        `http://localhost:3001/tasks?limit_lte=${today}&completedAt_gte=${today}&_sort=sortId`
      )
      .then((res) => setTasks(res.data));
  }, [setTasks]);

  useEffect(() => {
    getTasks();
  }, []);

  // inputからフォーカスを外す処理
  const outOfFocus = () => {
    setIsOpenAdd(false);
    setIsOpenEdit(undefined);
    reset();
  };

  // ToDoを追加する処理
  const handleAddTask = useCallback(
    async (addData) => {
      await axios.post("http://localhost:3001/tasks", {
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

  // 対象のToDoを編集する処理
  const handleEditTask = useCallback(
    async (editData) => {
      await axios.patch(`http://localhost:3001/tasks/${isOpenEdit}`, {
        task: editData.editTask,
      });
      getTasks();
      reset();
      outOfFocus();
    },
    [isOpenEdit]
  );

  // 対象のToDoを削除する処理
  const handleRemoveTask = useCallback(
    async (index) => {
      await axios.delete(`http://localhost:3001/tasks/${tasks[index]?.id}`);
      getTasks();
    },
    [tasks]
  );

  // 対象のToDoを複製する処理
  const handleDuplicateTask = useCallback(
    async (index) => {
      await axios.post("http://localhost:3001/tasks", {
        sortId: tasks[index]?.sortId,
        task: tasks[index]?.task,
        limit: today,
        completed: false,
        completedAt: format(new Date("9999-12-31"), "yyyy-MM-dd"),
      });
      getTasks();
    },
    [tasks]
  );

  // ToDoを完了にする処理
  const handleCompletedTask = useCallback(
    async (index) => {
      await axios.patch(`http://localhost:3001/tasks/${tasks[index]?.id}`, {
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
    <div className="max-w-md">
      <h1 className="text-primary font-bold text-2xl">今日する</h1>

      {/* タスク編集 or タスク表示 */}
      <div className="mt-6 space-y-2">
        {tasks.map((task, index) =>
          isOpenEdit === task.id ? (
            // タスク編集時
            <form
              onSubmit={handleSubmit(handleEditTask)}
              key={task.id}
              className="flex items-center gap-x-2"
            >
              <span className="text-2xl text-gray-400">○</span>
              <Input
                name="editTask"
                register={register}
                defaultValue={task.task}
                outOfFocus={outOfFocus}
              />
            </form>
          ) : (
            // タスク表示
            <div
              key={task.id}
              className="flex items-center gap-x-2 group justify-between"
            >
              <div className="flex items-center text-left flex-1 gap-x-2">
                {/* 完了・非完了のチェックボックス */}
                <Button
                  onClick={() => handleCompletedTask(index)}
                  type="button"
                  className={`relative w-auto text-2xl text-gray-400 ${
                    task.completed
                      ? "after:content-['●'] after:text-sm after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-primary"
                      : ""
                  }`}
                >
                  ○
                </Button>

                {/* タスク内容（クリックで編集状態に移行） */}
                <Button
                  type="button"
                  disabled={task.completed}
                  onClick={() => setIsOpenEdit(task.id)}
                  className={`text-left ${
                    task.completed ? "text-gray-400 line-through" : "text-black"
                  }`}
                >
                  {task.task}
                </Button>
              </div>

              {/* 複製・削除ボタンはタスク完了状態では非表示にする */}
              {task.completed ? null : (
                <div className="flex items-center gap-x-2">
                  {/* 複製ボタン */}
                  <Button
                    type="button"
                    onClick={() => handleDuplicateTask(index)}
                    className="text-transparent w-full group-hover:text-gray-400"
                  >
                    <DuplicateIcon className="w-5 h-5" />
                  </Button>

                  {/* 削除ボタン */}
                  <Button
                    type="button"
                    onClick={() => handleRemoveTask(index)}
                    className="text-transparent w-full group-hover:text-gray-400"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          )
        )}

        {/* タスク入力状態 or タスク追加ボタン */}
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
    </div>
  );
};
