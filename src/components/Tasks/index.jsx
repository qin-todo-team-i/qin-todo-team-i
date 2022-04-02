import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Draggable from "../DnD/Draggable";
import { AddTask } from "./AddTask";
import { DeleteTask } from "./DeleteTask";
import { DoneTask } from "./DoneTask";
import { DuplicateTask } from "./DuplicateTask";
import { EditTask } from "./EditTask";
import { TaskList } from "./TaskList";

export const Tasks = ({ limit, items, firstIndex, onMove }) => {
  const [targetId, setTargetId] = useState(undefined);

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
      onMove(dragIndex, targetIndex, limit);
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

      <div className="mt-6 space-y-2" ref={ref}>
        {items
          ? items.map((task, index) =>
              targetId === task.id ? ( // タスク編集状態
                <div key={task.id}>
                  <EditTask targetId={targetId} setTargetId={setTargetId} />
                </div>
              ) : (
                // 非タスク編集状態
                <Draggable key={task.id} item={{ ...task, index }} index={firstIndex + index} onMove={onMove}>
                  <div key={task.id} className="flex items-start gap-x-2 group justify-between border border-gray">
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
