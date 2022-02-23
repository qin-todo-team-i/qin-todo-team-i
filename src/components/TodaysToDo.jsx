import { DuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// inputコンポーネント
const Input = ({ name, register, onBlurFunc, defaultValue }) => (
  <input
    {...register(name, { required: true })}
    type="text"
    autoFocus
    defaultValue={defaultValue}
    onBlur={onBlurFunc}
    className="caret-primary outline-primary rounded w-full"
  />
);

// buttonコンポーネント
const Button = ({ children, type, onClick, className }) => (
  <button type={type} onClick={onClick} className={`w-full ${className}`}>
    {children}
  </button>
);

export const TodaysToDo = () => {
  // react-hook-formを使ったフォームバリデーション
  const { handleSubmit, register, reset } = useForm();

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [isCompletionWaiting, setIsCompletionWaiting] = useState(false);

  // 今日以降のタスクのみをフィルタリング
  const todaysTask = tasks.filter(
    (task) => task.limit >= format(new Date(), "yyyy-MM-dd")
  );

  // ToDoを追加する関数
  const handleAddTask = (addData) => {
    setTasks([
      ...tasks,
      {
        id: tasks.length === 0 ? 0 : tasks[tasks.length - 1].id + 1,
        task: addData.addTask,
        limit: format(new Date(), "yyyy-MM-dd"),
        completed: false,
      },
    ]);
    reset();
  };

  // 対象のToDoを編集する関数
  const handleEditTask = (editData) => {
    setTasks(
      tasks.map((task, index) =>
        index === isOpenEdit
          ? {
              id: task.id,
              task: editData.editTask,
              limit: task.limit,
              completed: task.completed,
            }
          : task
      )
    );
    setIsOpenEdit(undefined);
    reset();
  };

  // 対象のToDoを削除する関数
  const handleRemoveTask = (index) => {
    // 削除ボタンを押した対象以外で新しい配列を作成
    const newTasks = tasks.filter((task, i) => i !== index);
    // 新しい配列にidを振り直す
    setTasks(
      newTasks.map((task, i) =>
        task.id !== index
          ? {
              id: i,
              task: task.task,
              limit: task.limit,
              completed: task.completed,
            }
          : task
      )
    );
  };

  // ToDoを複製後、配列をid順にソートするための関数
  const handleSortId = (lists) =>
    lists.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

  // 対象のToDoを複製する関数
  const handleDuplicateTask = (index) => {
    // 選択したタスク以降のidに+1する
    const organizeIdTasks = tasks.map((task) =>
      task.id > index
        ? {
            id: task.id + 1,
            task: task.task,
            limit: task.limit,
            completed: task.completed,
          }
        : task
    );
    // タスクを複製して元タスクのidに+1する
    const newTasks = [
      ...organizeIdTasks,
      {
        id: tasks[index].id + 1,
        task: tasks[index].task,
        limit: tasks[index].limit,
        completed: tasks[index].completed,
      },
    ];

    setTasks(handleSortId(newTasks));
  };

  // ToDoを完了にする関数
  const handleCompletedTask = (index) => {
    // 対象のタスクのcompletedのトグル操作
    setIsCompletionWaiting(true);
    setTasks(
      tasks.map((task) =>
        index === task.id
          ? {
              id: task.id,
              task: task.task,
              limit: task.limit,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  useEffect(() => {
    // タスクの完了がクリックされた後に未完了のタスクのみで新しくフィルタリングする（2秒後に実行される）
    if (isCompletionWaiting) {
      const timer = setTimeout(() => {
        const newTasks = tasks.filter((task) => task.completed === false);
        // 新しい配列にidを振り直す
        setTasks(
          newTasks.map((task, index) =>
            task.id !== index
              ? {
                  id: index,
                  task: task.task,
                  limit: task.limit,
                  completed: task.completed,
                }
              : task
          )
        );
        setIsCompletionWaiting(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [tasks]);

  // inputからフォーカスが外れた時の関数
  const onBlurFunc = () => {
    setIsOpenAdd(false);
    setIsOpenEdit(false);
    reset();
  };

  return (
    <div className="max-w-md">
      <h1 className="text-primary font-bold text-2xl">今日する</h1>

      {/* タスク編集 or タスク表示 */}
      <div className="mt-6 space-y-2">
        {todaysTask.map((task, index) =>
          isOpenEdit === index ? (
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
                onBlurFunc={onBlurFunc}
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
                  onClick={() => setIsOpenEdit(index)}
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
            <Input name="addTask" register={register} onBlurFunc={onBlurFunc} />
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
