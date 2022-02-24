import React from "react";
import { TodaysToDo } from "src/components/TodaysToDo";
import { Layout } from "src/layouts/Layout";

export default function Home() {
	return (
		<Layout>
			<div>
				<TodaysToDo />
			</div>
		</Layout>
	);
}
