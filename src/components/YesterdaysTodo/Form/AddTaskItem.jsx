import React, { useState } from "react";
import UUID from "uuidjs";
import { PlusCircleIcon } from "@heroicons/react/solid";

export const AddTaskItem = (props) => {
  const { setTasks } = props;
  const [inputText, setInputText] = useState("");

  const handleChangeInputText = (e) => {
    setInputText(e.target.value);
  };
  const handleKeyDown = (e) => {
    // エンターキーが押された時の処理
    if (e.keyCode === 13 && inputText) {
      addTask(); // 自身をListに追加
      setInputText(""); // 入力値をリセット
    }
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
      <PlusCircleIcon className="text-gray w-6 h-6" />
      <input
        type="text"
        value={inputText}
        className="border-none focus:outline-none grow"
        onChange={handleChangeInputText}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
