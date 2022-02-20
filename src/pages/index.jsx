import React from "react";
import { TodaysToDo } from "src/components/TodaysToDo";
import { Layout } from "src/layouts/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <h1 className="text-primary">練習用</h1>
        <div className="flex justify-between mx-40">
          <TodaysToDo>
            <h1 className="text-primary">今日する</h1>
          </TodaysToDo>

          <TodaysToDo>
            <h1 className="text-secondary">明日する</h1>
          </TodaysToDo>

          <TodaysToDo>
            <h1 className="text-tertiary">今度する</h1>
          </TodaysToDo>
        </div>
      </Layout>
    </>
  );
}
