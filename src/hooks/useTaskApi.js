import axios from "axios";
import { format } from "date-fns";
import { tasksUrl } from "src/lib/TasksUrl";
import { today } from "src/lib/Today";
import { tomorrow } from "src/lib/Tomorrow";
import { nextTime } from "src/lib/NextTime";
import UUID from "uuidjs";

export const useTaskApi = () => {
  const getTasks = async (setTasks) => {
    await axios.get(`${tasksUrl}?&_sort=createdAt`).then((res) => setTasks(res.data));
  };

  const postTask = async (taskText, limit, setTasks) => {
    await axios.post(tasksUrl, {
      id: UUID.generate(),
      task: taskText,
      limit: limit,
      group: getGroupLabel(limit, format(new Date("9999-12-31"), "yyyy-MM-dd")),
      done: false,
      doneAt: format(new Date("9999-12-31"), "yyyy-MM-dd"),
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss:T"),
    });
    getTasks(setTasks);
  };

  const getGroupLabel = (limit, doneAt) => {
    // if (limit === "today") {
    //   return format(new Date(task.limit), "yyyy-MM-dd") <= today && task.doneAt >= today;
    // }
    // if (limit === "tomorrow") {
    //   return format(new Date(task.limit), "yyyy-MM-dd") === tomorrow && task.doneAt >= today;
    // }
    // if (limit === "nextTime") {
    //   return format(new Date(task.limit), "yyyy-MM-dd") >= nextTime && task.doneAt >= today;
    // }
    if (format(new Date(limit), "yyyy-MM-dd") <= today && doneAt >= today) {
      console.log("return today");
      return "today";
    }
    if (format(new Date(limit), "yyyy-MM-dd") === tomorrow && doneAt >= today) {
      console.log("return tomorrow");
      return "tomorrow";
    }
    if (format(new Date(limit), "yyyy-MM-dd") >= nextTime && doneAt >= today) {
      console.log("return nextTime");
      return "nextTime";
    }
    console.log("return null");
    return "";
  };

  const doneTask = async (patchUrl, done, setTasks) => {
    await axios.patch(patchUrl, {
      done: done === true ? false : true,
      doneAt: done ? format(new Date("9999-12-31"), "yyyy-MM-dd") : today,
    });
    getTasks(setTasks);
  };

  const duplicateTask = async (taskText, limit, createdAt, setTasks) => {
    await axios.post(tasksUrl, {
      id: UUID.generate(),
      task: taskText,
      limit: limit,
      group: getGroupLabel(limit, format(new Date("9999-12-31"), "yyyy-MM-dd")),
      done: false,
      doneAt: format(new Date("9999-12-31"), "yyyy-MM-dd"),
      createdAt: createdAt,
    });
    getTasks(setTasks);
  };

  const patchTask = async (patchUrl, editTask, setTasks) => {
    await axios.patch(patchUrl, {
      task: editTask,
    });
    getTasks(setTasks);
  };

  const deleteTask = async (deleteUrl, setTasks) => {
    await axios.delete(deleteUrl);
    getTasks(setTasks);
  };

  return { getTasks, duplicateTask, doneTask, postTask, patchTask, deleteTask };
};
