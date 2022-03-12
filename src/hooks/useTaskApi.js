import axios from "axios";
import { format } from "date-fns";
import UUID from "uuidjs";

export const useTaskApi = () => {
  const getTasks = async (url, setTasks) => {
    await axios.get(url).then((res) => setTasks(res.data));
  };
  const postTask = async (getUrl, postUrl, taskText, setTasks, type) => {
    await axios.post(postUrl, {
      id: UUID.generate(),
      task: taskText,
      type: type,
      completed: false,
      completedAt: null,
      createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    });
    getTasks(getUrl, setTasks);
  };
  const patchTask = async (getUrl, patchUrl, body, setTasks) => {
    await axios.patch(patchUrl, body);
    getTasks(getUrl, setTasks);
  };
  const deleteTask = async (getUrl, deleteUrl, setTasks) => {
    await axios.delete(deleteUrl);
    getTasks(getUrl, setTasks);
  };
  return { getTasks, postTask, patchTask, deleteTask };
};
