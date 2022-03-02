import React, { useState } from "react";
import cc from "classcat";

export const AddTaskItem = (props) => {
  const { setTasks } = props;
  const [inputText, setInputText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClickButton = () => {
    setIsCompleted(!isCompleted);
  };
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
          text: inputText,
          isCompleted: false,
        },
      ];
    });
  };

  return (
    <div className="flex items-center gap-3 w-full p-2">
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
      />
    </div>
  );
};
