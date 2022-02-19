import React from "react";
import { TodaysToDo } from "src/components/TodaysToDo";
import { Layout } from "src/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <div>
        <h1 className="text-primary">練習用</h1>
        <TodaysToDo />
      </div>
    </Layout>
  );
}
