import React, { useEffect, useState } from "react";
import cc from "classcat";

import { DuplicateButton } from "./Button/DuplicateButton";
import { DeleteButton } from "./Button/DeleteButton";

// memo
// - 作成済み（確定済み）が否かのステータスを持つ : isXXX
// - 作成前はプラスアイコン
// - 作成後はチェックボックス風ボタン
const Task = () => {
  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleClickButton = () => {
    setIsChecked(!isChecked);
  };
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // エンターキーが押された時の処理
      console.log("enter");
    }
  };

  return (
    <div
      className="flex items-center gap-3 w-full p-2"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      <button
        onClick={handleClickButton}
        className={cc({
          "relative w-6 h-6 border-2 border-gray rounded-full": true,
          "after:block after:w-4 after:h-4 after:bg-secondary after:absolute after:z-10 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2":
            isChecked,
        })}
      ></button>
      <input
        type="text"
        value={text}
        className={cc({
          "border-none focus:outline-none grow": true,
          "text-gray line-through": isChecked,
        })}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
      />
      {isMouseOver && (
        <div className="inline-flex items-center gap-5">
          <DuplicateButton />
          <DeleteButton />
        </div>
      )}
    </div>
  );
};

export const YesterdaysTodo = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks([<Task key={1} />, <Task key={2} />, <Task key={3} />]);
  }, []);

  return (
    <div className="p-5">
      <div className="mb-4">
        <h2 className="text-secondary text-1.5xl font-bold px-2">明日する</h2>
      </div>
      <div className="">
        {/* <Task /> */}
        {/* <Task /> */}
        {tasks.map((task) => task)}
      </div>
    </div>
  );
};
