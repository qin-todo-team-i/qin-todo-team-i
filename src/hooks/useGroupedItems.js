import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { today } from "src/lib/Today";

const GroupTypes = ["today", "tomorrow", "nextTime"];

const useGroupedItems = (items) => {
  const [list, setList] = useState(items);
  useEffect(() => {
    setList(items);
  }, [items]);
  const [groupedItems, setGroupedItems] = useState({});
  useEffect(() => {
    setGroupedItems(
      GroupTypes.reduce((acc, group) => {
        acc[group] = list.filter((v) => v.group === group && v.doneAt >= today);
        return acc;
      }, {})
    );
  }, [list]);
  return [groupedItems, list, setList];
};

export default useGroupedItems;
