import { DuplicateIcon } from "@heroicons/react/outline";
import { useTaskApi } from "src/hooks/useTaskApi";

export const DuplicateTaskButton = (props) => {
  const { task, setTasks, type } = props;
  const { postTask } = useTaskApi();
  //タスク複製メソッド
  const onClickDuplicateNextTimeTodo = (task) => {
    postTask(
      "http://localhost:3001/tasks?type=nextTime&_sort=createdAt",
      "http://localhost:3001/tasks",
      task.task,
      setTasks,
      type
    );
  };
  return (
    <DuplicateIcon
      className="w-5 text-white group-hover:text-gray"
      onClick={() => onClickDuplicateNextTimeTodo(task)}
    />
  );
};
