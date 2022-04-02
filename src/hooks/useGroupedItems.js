import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { today } from "src/lib/Today";

const GroupTypes = ["today", "tomorrow", "nextTime"];

// if (limit === "today") {
//   return format(new Date(task.limit), "yyyy-MM-dd") <= today && task.doneAt >= today;
// }
// if (limit === "tomorrow") {
//   return format(new Date(task.limit), "yyyy-MM-dd") === tomorrow && task.doneAt >= today;
// }
// if (limit === "nextTime") {
//   return format(new Date(task.limit), "yyyy-MM-dd") >= nextTime && task.doneAt >= today;
// }

const useGroupedItems = (items) => {
  // console.log("useGroupedItems: ", items);
  const [list, setList] = useState(items);
  useEffect(() => {
    // console.log("items更新された");
    setList(items);
  }, [items]);
  // console.log({ list });
  const [groupedItems, setGroupedItems] = useState({});
  useEffect(() => {
    // console.log("list更新された");
    setGroupedItems(
      GroupTypes.reduce((acc, group) => {
        // console.log("hoge", list, group); //TODO:
        // acc[group] = list.filter((v) => v.group === group);
        acc[group] = list.filter((v) => v.group === group && v.doneAt >= today);
        return acc;
      }, {})
    );
  }, [list]);
  // console.log({ groupedItems });
  return [groupedItems, list, setList];
};

export default useGroupedItems;
