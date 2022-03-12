import { TrashIcon } from "@heroicons/react/outline";
import { useTaskApi } from "src/hooks/useTaskApi";

export const DeleteTaskButton = (props) => {
  const { task, setTasks } = props;
  const { deleteTask } = useTaskApi();
  //タスク削除メソッド
  const onClickDeleteTask = (task) => {
    deleteTask(
      "http://localhost:3001/tasks?type=nextTime",
      `http://localhost:3001/tasks/${task.id}`,
      setTasks
    );
  };
  return (
    <TrashIcon
      className="w-5 text-white group-hover:text-gray"
      onClick={() => onClickDeleteTask(task)}
    />
  );
};
