import React from "react";
import { Layout } from "src/layouts/Layout";
import { TodaysToDo } from "src/components/TodaysToDo";
import { YesterdaysTodo } from "src/components/YesterdaysTodo";

const Home = () => {
  return (
    <Layout>
      <div>
        <TodaysToDo />
        <YesterdaysTodo />
      </div>
    </Layout>
  );
};

export default Home;
