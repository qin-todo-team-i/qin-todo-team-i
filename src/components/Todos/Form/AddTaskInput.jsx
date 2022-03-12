import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useTaskApi } from "src/hooks/useTaskApi";

export const AddTaskInput = (props) => {
  const { setTasks, caretColor, type, tasks } = props;
  const [taskText, setTaskText] = useState("");
  const [inputState, setInputState] = useState(true);
  const { postTask } = useTaskApi();
  //タスク生成メソッド
  const createTasks = () => {
    postTask(
      "http://localhost:3001/tasks?type=nextTime&_sort=createdAt",
      "http://localhost:3001/tasks",
      taskText,
      setTasks,
      type
    );
    setTaskText("");
  };
  const handleChangetaskText = (e) => {
    setTaskText(e.target.value);
  };
  const handleKeyDownCreateTask = (e) => {
    // エンターキーが押された時の処理
    if (e.keyCode === 13) {
      if (!taskText) {
        setInputState(true);
        return;
      }
      createTasks();
    }
  };
  const handleChangeInputState = () => {
    setInputState(!inputState);
  };
  const handleBlurCreateTask = () => {
    if (!taskText) {
      setInputState(true);
      return;
    }
    createTasks();
    setInputState(true);
  };

  return (
    <div className="py-2 flex items-center text-gray">
      {inputState ? (
        <div className="flex gap-3" onClick={handleChangeInputState}>
          <PlusCircleIcon className="w-6 h-6" />
          <p className="text-gray">タスクを追加する</p>
        </div>
      ) : (
        <div className="flex items-center">
          <button className="w-6 h-6 border border-solid border-2 border-gray-400 rounded-full mr-3"></button>
          <input
            type="text"
            onKeyDown={handleKeyDownCreateTask}
            onChange={handleChangetaskText}
            onBlur={handleBlurCreateTask}
            value={taskText}
            className={`${caretColor} text-black outline-none`}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};
