import React from "react";
import { Layout } from "src/layouts/Layout";
import { TodaysToDo } from "src/components/Todos/TodaysToDo";
import { YesterdaysTodo } from "src/components/Todos/YesterdaysTodo";
import { NextTimeTodos } from "src/components/Todos/NextTimeTodos";
import { useFetch } from "src/hooks/useFetch";

const Home = () => {
  const { data, error, isLoading } = useFetch("http://localhost:3001/tasks");
  if (isLoading) {
    return <div>now ...Loading</div>;
  }
  if (error) {
    return <div>データ取得に失敗しました</div>;
  }

  const todayTodos = data.filter((task) => task.type === "today");
  const tommorowTodos = data.filter((task) => task.type === "tommorow");
  const nextTimeTodos = data.filter((task) => task.type === "nextTime");
  return (
    <Layout>
      <div className="flex justify-between max-w-7xl mt-10 mx-20">
        <TodaysToDo data={todayTodos} />
        <YesterdaysTodo data={tommorowTodos} />
        <NextTimeTodos data={nextTimeTodos} />
      </div>
    </Layout>
  );
};

export default Home;
