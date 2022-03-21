import { format } from "date-fns";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { nextTime } from "src/lib/NextTime";
import { today } from "src/lib/Today";
import { tomorrow } from "src/lib/Tomorrow";
import { tasksState } from "src/state/TasksState";
import { AddTask } from "./AddTask";
import { DeleteTask } from "./DeleteTask";
import { DoneTask } from "./DoneTask";
import { DuplicateTask } from "./DuplicateTask";
import { EditTask } from "./EditTask";
import { TaskList } from "./TaskList";

export const Tasks = ({ limit }) => {
  const tasks = useRecoilValue(tasksState);
  const [targetId, setTargetId] = useState(undefined);

  const filteredTasks = tasks.filter((task) => {
    if (limit === "today") {
      return (
        format(new Date(task.limit), "yyyy-MM-dd") <= today &&
        task.doneAt >= today
      );
    }
    if (limit === "tomorrow") {
      return (
        format(new Date(task.limit), "yyyy-MM-dd") === tomorrow &&
        task.doneAt >= today
      );
    }
    if (limit === "nextTime") {
      return (
        format(new Date(task.limit), "yyyy-MM-dd") >= nextTime &&
        task.doneAt >= today
      );
    }
    return [];
  });

  return (
    <div className="w-full p-5">
      {limit === "today" ? (
        <h1 className="text-primary font-bold text-1.5xl">今日する</h1>
      ) : limit === "tomorrow" ? (
        <h1 className="text-secondary font-bold text-1.5xl">明日する</h1>
      ) : limit === "nextTime" ? (
        <h1 className="text-tertiary font-bold text-1.5xl">今度する</h1>
      ) : null}

      <div className="mt-6 space-y-2">
        {filteredTasks
          ? filteredTasks.map((task) =>
              targetId === task.id ? (
                // タスク編集状態
                <div key={task.id}>
                  <EditTask targetId={targetId} setTargetId={setTargetId} />
                </div>
              ) : (
                // 非タスク編集状態
                <div
                  key={task.id}
                  className="flex items-start gap-x-2 group justify-between"
                >
                  <div className="flex items-start text-left flex-1 gap-x-2">
                    {/* 完了・非完了のチェックボックス */}
                    <DoneTask targetId={task.id} limit={limit} />

                    {/* タスク内容の表示（クリックで編集状態に移行） */}
                    <div className="self-center w-full">
                      <TaskList task={task} setTargetId={setTargetId} />
                    </div>
                  </div>

                  {/* 複製・削除ボタンはタスク完了状態では非表示にする */}
                  {task.done ? null : (
                    <div className="flex items-center gap-x-2">
                      {/* 複製ボタン */}
                      <DuplicateTask targetId={task.id} />

                      {/* 削除ボタン */}
                      <DeleteTask targetId={task.id} />
                    </div>
                  )}
                </div>
              )
            )
          : null}

        {/* タスク追加 */}
        <AddTask limit={limit} />
      </div>
    </div>
  );
};
