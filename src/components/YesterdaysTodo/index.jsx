import React, { useEffect, useState } from "react";

import { AddTaskItem } from "./Form/AddTaskItem";
import { TaskItem } from "./TaskItem";

export const YesterdaysTodo = () => {
  const [tasks, setTasks] = useState([]);
  console.log({ tasks });

  // useEffect(() => {
  //   setTasks([<Task key={1} />, <Task key={2} />, <Task key={3} />]);
  // }, []);

  //TODO:
  // isEditing が true から false に変わったタイミングで値を更新する？

  return (
    <div className="p-5">
      <div className="mb-4">
        <h2 className="text-secondary text-1.5xl font-bold px-2">明日する</h2>
      </div>
      <div className="">
        {tasks.map((task) => {
          return <TaskItem key={task.id} task={task} tasks={tasks} setTasks={setTasks} />;
        })}
        <AddTaskItem setTasks={setTasks} />
      </div>
    </div>
  );
};
