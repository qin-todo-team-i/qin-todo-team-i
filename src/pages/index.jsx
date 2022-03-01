import React, { useEffect, useState } from "react";
import { Layout } from "src/layouts/Layout";
import { YesterdaysTodo } from "src/components/YesterdaysTodo/YesterdaysTodo";

export default function Home() {
  return (
    <Layout>
      <YesterdaysTodo />
    </Layout>
  );
}
