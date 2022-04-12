import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const Draggable = ({ item, index, onMove, children }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    // acceptに指定したtypeだけがコールバックへの対象となる
    accept: ["today", "tomorrow", "nextTime"],
    // マウスドラッグをしたときにhoverした部分でのコールバックを定義
    hover(dragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      if (item.group === dragItem.group) {
        // グループ内での並び替えの場合は入れ替え方向とhover位置に応じて入れ替えるかを確定
        const hoverRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverRect.bottom - hoverRect.top) / 2;
        const mousePosition = monitor.getClientOffset();
        if (!mousePosition) return;
        const hoverClientY = mousePosition.y - hoverRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY * 0.5) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY * 1.5) return;
      }

      // 内部のデータも変更しつつ、onMoveでstate変更を依頼する
      onMove(dragIndex, hoverIndex, item.group);
      dragItem.index = hoverIndex;
      dragItem.group = item.group;
    },
  });

  // collectでmonitorから取得したデータのみが戻り値として利用できる (collectに指定することで型補完も適用される)
  const [{ isDragging, canDrag }, drag] = useDrag({
    item: { ...item, index },
    type: item.group,
    isDragging: (monitor) => monitor.getItem().id === item.id,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      canDrag: monitor.canDrag(),
    }),
  });

  // refをconnectorと呼ばれる関数(drag,drop)に渡すことで、対象refと↑のuseDrag,useDropでの処理を結びつける
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.4 : 1,
        cursor: canDrag ? "move" : "default",
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
