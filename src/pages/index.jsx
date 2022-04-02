import React, { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Tasks } from "src/components/Tasks";
import { useFetch } from "src/hooks/useFetch";
import useGroupedItems from "src/hooks/useGroupedItems";
import { useTaskApi } from "src/hooks/useTaskApi";
import { Layout } from "src/layouts/Layout";
import { tasksUrl } from "src/lib/TasksUrl";
import { tasksState } from "src/state/TasksState";

const Home = () => {
  const [tasks, setTasks] = useRecoilState(tasksState);

  const { getTasks } = useTaskApi();
  useEffect(() => {
    console.log("useEffect");
    getTasks(setTasks);
  }, []);

  const [groupedItems, items, setItems] = useGroupedItems(tasks);

  const moveItem = useCallback(
    (dragIndex, targetIndex, group) => {
      console.log("moveItem", dragIndex, targetIndex, group); //TODO:
      const item = items[dragIndex];
      if (!item) return;
      setItems((prevState) => {
        const newItems = prevState.filter((_, idx) => idx !== dragIndex);
        newItems.splice(targetIndex, 0, { ...item, group });
        return newItems;
      });
    },
    [items, setItems]
  );
  // console.log({ groupedItems });

  const { error, isLoading } = useFetch(tasksUrl);
  if (isLoading) {
    return <div>now ...Loading</div>;
  }
  if (error) {
    return <div>データ取得に失敗しました</div>;
  }

  const todayItems = groupedItems["today"];
  const tomorrowItems = groupedItems["tomorrow"];
  const nextTimeItems = groupedItems["nextTime"];

  const firstIndexToday = 0;
  const firstIndexTomorrow = todayItems.length;
  const firstIndexNextTime = firstIndexTomorrow + tomorrowItems.length;

  return (
    <Layout>
      <div className="flex justify-between max-w-7xl mt-10 mx-auto">
        <Tasks limit="today" items={todayItems} firstIndex={firstIndexToday} onMove={moveItem} />
        <Tasks limit="tomorrow" items={tomorrowItems} firstIndex={firstIndexTomorrow} onMove={moveItem} />
        <Tasks limit="nextTime" items={nextTimeItems} firstIndex={firstIndexNextTime} onMove={moveItem} />
      </div>
    </Layout>
  );
};

export default Home;
