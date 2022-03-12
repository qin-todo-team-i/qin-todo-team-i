import React, { useState } from "react";
import { format } from "date-fns";
import { RadioButton } from "../Button/RadioButton";
import { DuplicateTaskButton } from "../Button/DuplicataTaskButton";
import { DeleteTaskButton } from "../Button/DeleteTaskButton";
import { useTaskApi } from "src/hooks/useTaskApi";

export const TaskItem = (props) => {
  const { task, setTasks, color, type } = props;
  const [taskText, setTaskText] = useState("");
  const [editKey, setEditKey] = useState(null);
  const { patchTask } = useTaskApi();
  const onChangeEditText = (e) => {
    setTaskText(e.target.value);
  };
  // タスク編集メソッド
  const editTask = (targetTask) => {
    const body = {
      task: taskText,
    };
    patchTask(
      "http://localhost:3001/tasks?type=nextTime",
      `http://localhost:3001/tasks/${targetTask.id}`,
      body,
      setTasks
    );
  };
  //タスク完了操作メソッド
  const onClickChangeCompleted = (targetTask) => {
    const body = {
      completed: !targetTask.completed,
      completedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    };
    patchTask(
      "http://localhost:3001/tasks?type=nextTime",
      `http://localhost:3001/tasks/${targetTask.id}`,
      body,
      setTasks
    );
  };
  const onKeyDownEditTask = (e, targetTask) => {
    if (e.keyCode === 13) {
      if (!taskText) {
        setEditKey(null);
        return;
      }
      editTask(targetTask);
      setEditKey(null);
      setTaskText("");
    }
  };
  //編集した値のセットメソッド
  const onBlurEditTask = (targetTask) => {
    if (!taskText) {
      setEditKey(null);
      return;
    }
    editTask(targetTask);
    setEditKey(null);
    setTaskText("");
  };
  const onClickEditTodo = (targetTask) => {
    setEditKey(targetTask.id);
    setTaskText(targetTask.task);
  };
  return (
    <div className="w-full py-2 gap-3 flex items-center group">
      <RadioButton
        buttonColor={color}
        onClickChangeCompleted={onClickChangeCompleted}
        task={task}
      />
      {editKey === task.id ? (
        <input
          type="text"
          className={`outline-none caret-${color} max-w-max`}
          onChange={onChangeEditText}
          onKeyDown={(e) => onKeyDownEditTask(e, task)}
          onBlur={() => onBlurEditTask(task)}
          value={taskText}
          autoFocus
        />
      ) : (
        <button
          onClick={() => onClickEditTodo(task)}
          className={`${
            task.completed ? "line-through decoration-gray text-gray" : ""
          }`}
        >
          {task.task}
        </button>
      )}

      {task.completed || editKey === task.id ? null : (
        <div className="flex items-center gap-x-2 ml-3">
          <DuplicateTaskButton task={task} setTasks={setTasks} type={type} />
          <DeleteTaskButton task={task} setTasks={setTasks} />
        </div>
      )}
    </div>
  );
};
