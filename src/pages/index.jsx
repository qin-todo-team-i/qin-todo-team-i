import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Tasks } from "src/components/Tasks";
import { useFetch } from "src/hooks/useFetch";
import { useTaskApi } from "src/hooks/useTaskApi";
import { Layout } from "src/layouts/Layout";
import { tasksUrl } from "src/lib/TasksUrl";
import { tasksState } from "src/state/TasksState";

const Home = () => {
  const setTasks = useSetRecoilState(tasksState);

  const { getTasks } = useTaskApi();
  useEffect(() => {
    getTasks(setTasks);
  }, [getTasks, setTasks]);

  const { error, isLoading } = useFetch(tasksUrl);
  if (isLoading) {
    return <div>now ...Loading</div>;
  }
  if (error) {
    return <div>データ取得に失敗しました</div>;
  }

  return (
    <Layout>
      <div className="flex justify-between max-w-7xl mt-10 mx-auto">
        <Tasks limit="today" />
        <Tasks limit="tomorrow" />
        <Tasks limit="nextTime" />
      </div>
    </Layout>
  );
};

export default Home;
