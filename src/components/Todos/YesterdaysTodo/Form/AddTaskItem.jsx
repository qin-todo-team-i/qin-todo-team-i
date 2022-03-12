import React, { useState } from "react";
import UUID from "uuidjs";
import { PlusCircleIcon } from "@heroicons/react/solid";

export const AddTaskItem = (props) => {
  const { setTasks } = props;
  const [inputText, setInputText] = useState("");
  const [inputState, setInputState] = useState(true);

  const handleChangeInputText = (e) => {
    setInputText(e.target.value);
  };

  const handleChangeInputState = () => {
    setInputState(!inputState);
  };
  const handleKeyDown = (e) => {
    // エンターキーが押された時の処理
    if (e.keyCode === 13 && inputText) {
      addTask(); // 自身をListに追加
      setInputText(""); // 入力値をリセット
    }
  };
  const handleBlur = () => {
    if (!inputText) {
      setInputState(true);
      return;
    }
    addTask;
    setInputState(true);
  };

  const addTask = () => {
    setTasks((_tasks) => {
      return [
        ..._tasks,
        {
          id: UUID.generate(),
          text: inputText,
          isCompleted: false,
        },
      ];
    });
  };

  return (
    <div className="flex items-center gap-3 w-full p-2">
      {inputState ? (
        <div className="flex gap-3" onClick={handleChangeInputState}>
          <PlusCircleIcon className="w-6 h-6 text-gray" />
          <p className="text-gray">タスクを追加する</p>
        </div>
      ) : (
        <div className="flex items-center">
          <button className="w-6 h-6 border border-solid border-2 border-gray rounded-full mr-3"></button>
          <input
            type="text"
            value={inputText}
            className="border-none focus:outline-none grow caret-secondary"
            onChange={handleChangeInputText}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};
