import { format } from "date-fns";
import React, { useEffect, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import useGroupedItems from "src/hooks/useGroupedItems";
import { nextTime } from "src/lib/NextTime";
import { today } from "src/lib/Today";
import { tomorrow } from "src/lib/Tomorrow";
import { tasksState } from "src/state/TasksState";
import Draggable from "../DnD/Draggable";
import { AddTask } from "./AddTask";
import { DeleteTask } from "./DeleteTask";
import { DoneTask } from "./DoneTask";
import { DuplicateTask } from "./DuplicateTask";
import { EditTask } from "./EditTask";
import { TaskList } from "./TaskList";

export const Tasks = ({ limit, items, onMove }) => {
  // const tasks = useRecoilValue(tasksState);
  // const [tasks, setTasks] = useRecoilState(tasksState);
  const [targetId, setTargetId] = useState(undefined);
  // const [filterdTaskAddGroup, setFilterdTaskAddGroup] = useState([]);
  // console.log({ filterdTaskAddGroup });

  // useEffect(() => {

  // const filteredTasks = Array.isArray(groupedItems[limit])
  //   ? groupedItems[limit] //.filter((task) => task.doneAt >= today)
  //   : [];
  // console.log({ filteredTasks });
  // }, [tasks]);

  // useEffect(() => {
  //   // console.log({ tasks });
  //   const filteredTasks = tasks.filter((task) => {
  //     if (limit === "today") {
  //       return format(new Date(task.limit), "yyyy-MM-dd") <= today && task.doneAt >= today;
  //     }
  //     if (limit === "tomorrow") {
  //       return format(new Date(task.limit), "yyyy-MM-dd") === tomorrow && task.doneAt >= today;
  //     }
  //     if (limit === "nextTime") {
  //       return format(new Date(task.limit), "yyyy-MM-dd") >= nextTime && task.doneAt >= today;
  //     }
  //     return [];
  //   });
  //   // どのタスクリストに属するかのプロパティ(group)を追加
  //   const _filterdTaskAddGroup = filteredTasks.map((task) => {
  //     return {
  //       ...task,
  //       group: limit,
  //     };
  //   });
  //   setFilterdTaskAddGroup(_filterdTaskAddGroup);
  //   console.log({ filterdTaskAddGroup });
  // }, [tasks]);

  // const moveItem = useCallback(
  //   (dragIndex, targetIndex, group) => {
  //     console.log("moveItem", dragIndex, targetIndex, group); //TODO:
  //     const item = tasks[dragIndex];
  //     // const item = tasks[dragIndex];
  //     if (!item) return;
  //     // setFilterdTaskAddGroup((prevState) => {
  //     //   const newItems = prevState.filter((_, idx) => idx !== dragIndex);
  //     //   newItems.splice(targetIndex, 0, { ...item, group });
  //     //   return newItems;
  //     // });
  //     setTasks((prevState) => {
  //       const newItems = prevState.filter((_, idx) => idx !== dragIndex);
  //       newItems.splice(targetIndex, 0, { ...item, group });
  //       return newItems;
  //     });
  //   },
  //   [filterdTaskAddGroup, setFilterdTaskAddGroup]
  // );

  const firstIndex = 0;
  const [, ref] = useDrop({
    accept: ["today", "tomorrow", "nextTime"],
    hover(dragItem) {
      const dragIndex = dragItem.index;
      if (dragItem.group === limit) return;
      const targetIndex =
        dragIndex < firstIndex
          ? // forward
            firstIndex + items.length - 1
          : // backward
            firstIndex + items.length;
      moveItem(dragIndex, targetIndex, limit);
      dragItem.index = targetIndex;
      dragItem.group = limit;
    },
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

      {/* <div className="mt-6 space-y-2" ref={ref}> */}
      <div className="mt-6 space-y-2">
        {items
          ? items.map((task, index) =>
              targetId === task.id ? ( // タスク編集状態
                // <Draggable key={task.id} item={{ ...task, index }} index={index} onMove={onMove}>
                <div key={task.id}>
                  <EditTask targetId={targetId} setTargetId={setTargetId} />
                </div>
              ) : (
                // </Draggable>
                // 非タスク編集状態
                <Draggable key={task.id} item={{ ...task, index }} index={index} onMove={onMove}>
                  <div key={task.id} className="flex items-start gap-x-2 group justify-between">
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
                </Draggable>
              )
            )
          : null}
        {/* タスク追加 */}
        <AddTask limit={limit} />
      </div>
    </div>
  );
};
