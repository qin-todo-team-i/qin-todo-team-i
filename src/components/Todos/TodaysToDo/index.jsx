import axios from "axios";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { AddTodaysToDo } from "./AddTodaysToDo";
import { CompletedTodaysToDo } from "./CompletedTodaysToDo";
import { DeleteTodaysToDo } from "./DeleteTodaysToDo";
import { DuplicateTodaysToDo } from "./DuplicateTodaysToDo";
import { EditTodaysToDo } from "./EditTodaysToDo";
import { TodaysToDoList } from "./TodaysToDoList";

// input コンポーネント
export const Input = ({ name, register, outOfFocus, defaultValue }) => (
  <input
    {...register(name, { required: true })}
    type="text"
    autoFocus
    defaultValue={defaultValue}
    onBlur={outOfFocus}
    className="caret-primary outline-none rounded w-full"
  />
);

// button コンポーネント
export const Button = ({ children, type, disabled, onClick, className }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`w-full ${className}`}
  >
    {children}
  </button>
);

// 今日の日付を取得
export const today = format(new Date(), "yyyy-MM-dd");

// task API のエンドポイント
export const tasksEndpoint = "http://localhost:3001/tasks";

export const TodaysToDo = ({ data }) => {
  const [tasks, setTasks] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(undefined);

  // task API のエンドポイントから ToDo リストを取得する処理
  const getTasks = useCallback(async () => {
    await axios
      .get(
        // 期限が今日以前かつ完了日時が今日以降（今日ではない：日付が変わったら取得しない）のタスク
        `${tasksEndpoint}?limit_lte=${today}&completedAt_gte=${today}&_sort=sortId`
      )
      .then((res) => setTasks(res.data));
  }, [setTasks]);

  useEffect(() => {
    setTasks(data);
  }, []);

  return (
    <div className="max-w-md p-5">
      <h1 className="text-primary font-bold text-1.5xl">今日する</h1>

      <div className="mt-6 space-y-2">
        {tasks.map((task, index) =>
          isOpenEdit === task.id ? (
            // タスク編集状態
            <div key={task.id}>
              <EditTodaysToDo
                isOpenEdit={isOpenEdit}
                setIsOpenEdit={setIsOpenEdit}
                task={task}
                getTasks={getTasks}
              />
            </div>
          ) : (
            <div
              key={task.id}
              className="flex items-center gap-x-2 group justify-between"
            >
              <div className="flex items-center text-left flex-1 gap-x-2">
                {/* 完了・非完了のチェックボックス */}
                <CompletedTodaysToDo
                  task={task}
                  tasks={tasks}
                  index={index}
                  getTasks={getTasks}
                />

                {/* タスク内容の表示（クリックで編集状態に移行） */}
                <TodaysToDoList task={task} setIsOpenEdit={setIsOpenEdit} />
              </div>

              {/* 複製・削除ボタンはタスク完了状態では非表示にする */}
              {task.completed ? null : (
                <div className="flex items-center gap-x-2">
                  {/* 複製ボタン */}
                  <DuplicateTodaysToDo
                    tasks={tasks}
                    index={index}
                    getTasks={getTasks}
                  />

                  {/* 削除ボタン */}
                  <DeleteTodaysToDo
                    tasks={tasks}
                    index={index}
                    getTasks={getTasks}
                  />
                </div>
              )}
            </div>
          )
        )}

        {/* タスク追加 */}
        <AddTodaysToDo tasks={tasks} getTasks={getTasks} />
      </div>
    </div>
  );
};
