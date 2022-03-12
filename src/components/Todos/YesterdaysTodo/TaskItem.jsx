import React, { useEffect, useState } from "react";
import cc from "classcat";
import UUID from "uuidjs";

import { DuplicateButton } from "./Button/DuplicateButton";
import { DeleteButton } from "./Button/DeleteButton";

export const TaskItem = (props) => {
  const { task, tasks, setTasks } = props;

  const [inputText, setInputText] = useState(task.text);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const index = tasks.findIndex((_task) => _task === task);

  useEffect(() => {
    updateTaskAtIndex();
  }, [isCompleted]);

  const handleClickButton = () => {
    setIsCompleted(!isCompleted);
  };
  const handleChangeInputText = (e) => {
    setInputText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && inputText) {
      // エンターキーが押された時の処理
      updateTaskAtIndex(); // タスクを更新
      createNewTaskAtNextIndex(); // 次のタスクを作成
    }
  };
  const handleOnBlur = () => {
    if (!inputText) {
      deleteTaskAtIndex(); // タスクを削除
    }
  };

  // タスクを更新し、空のタスクを作成
  const updateTaskAtIndex = () => {
    setTasks((_tasks) => {
      return [
        ..._tasks.slice(0, index),
        {
          id: task.id,
          text: inputText,
          isCompleted: isCompleted,
        },
        ..._tasks.slice(index + 1),
      ];
    });
  };
  // 次のインデックス位置に空のタスクを作成する
  const createNewTaskAtNextIndex = () => {
    setTasks((_tasks) => {
      return [
        ..._tasks.slice(0, index + 1),
        {
          id: UUID.generate(),
          text: "",
          isCompleted: false,
        },
        ..._tasks.slice(index + 1),
      ];
    });
  };
  // タスクを複製する
  const duplicateTaskAtIndex = () => {
    setTasks((_tasks) => {
      return [
        ..._tasks.slice(0, index + 1),
        {
          id: UUID.generate(),
          text: inputText,
          isCompleted: isCompleted,
        },
        ..._tasks.slice(index + 1),
      ];
    });
  };
  // タスクを削除する
  const deleteTaskAtIndex = () => {
    setTasks((_tasks) => {
      return [..._tasks.slice(0, index), ..._tasks.slice(index + 1)];
    });
  };

  return (
    <div
      className="flex items-center gap-3 w-full p-2"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onBlur={() => handleOnBlur()}
    >
      <button
        onClick={handleClickButton}
        className={cc({
          "relative w-6 h-6 border-2 border-gray rounded-full": true,
          "after:block after:w-4 after:h-4 after:bg-secondary after:absolute after:z-10 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2":
            isCompleted,
        })}
      ></button>
      <input
        type="text"
        value={inputText}
        className={cc({
          "border-none focus:outline-none grow": true,
          "text-gray line-through": isCompleted,
        })}
        onChange={handleChangeInputText}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      {isMouseOver && (
        <div className="inline-flex items-center gap-5">
          <DuplicateButton onClick={duplicateTaskAtIndex} />
          <DeleteButton onClick={deleteTaskAtIndex} />
        </div>
      )}
    </div>
  );
};
