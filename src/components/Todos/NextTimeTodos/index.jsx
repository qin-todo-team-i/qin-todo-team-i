import React, { useState } from "react";
import { AddTaskInput } from "../Form/AddTaskInput";
import { TaskItem } from "../Form/TaskItem";
const type = "nextTime";
export const NextTimeTodos = (props) => {
  const { data } = props;
  const [nextTimeTodos, setNextTimeTodos] = useState(data);

  return (
    <div className="p-5 flex flex-col">
      <h1 className="font-bold text-yellow-400 text-1.5xl">今度する</h1>
      <div className="mt-4">
        {nextTimeTodos.map((todo) => {
          return (
            <TaskItem
              task={todo}
              setTasks={setNextTimeTodos}
              color={"yellow-400"}
              key={todo.id}
              type={type}
            />
          );
        })}
        <AddTaskInput
          setTasks={setNextTimeTodos}
          caretColor={"caret-yellow-400"}
          type={type}
          tasks={data}
        />
      </div>
    </div>
  );
};
