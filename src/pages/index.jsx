import React from "react";
import { TodaysToDo } from "src/components/TodaysToDo";
import { Layout } from "src/layouts/Layout";

const Home = () => {
  return (
    <Layout>
      <div>
        <TodaysToDo />
      </div>
    </Layout>
  );
};

export default Home;
