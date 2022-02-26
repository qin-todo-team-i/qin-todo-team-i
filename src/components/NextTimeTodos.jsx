import React, { useState } from "react";
import { TrashIcon, DuplicateIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";

export const NextTimeTodos = () => {
  const [todoText, setTodoText] = useState("");
  const [editKey, setEditKey] = useState(null);
  const [nextTimeTodos, setNextTimeTodos] = useState([]);
  const [inputState, setInputState] = useState(true);
  //タスク生成メソッド
  const createNextTimeTodos = () => {
    setNextTimeTodos([
      ...nextTimeTodos,
      {
        id:
          nextTimeTodos.length === 0
            ? 0
            : nextTimeTodos[nextTimeTodos.length - 1].id + 1,
        todo: todoText,
        done: false,
        sort_key:
          nextTimeTodos.length === 0
            ? 0
            : nextTimeTodos[nextTimeTodos.length - 1].sort_key + 1,
      },
    ]);
    setTodoText("");
  };
  const onChangeTodoText = (e) => {
    setTodoText(e.target.value);
  };
  //タスク追加用入力フォームの表示状態操作
  const onClickChangeInputState = () => {
    setInputState(!inputState);
  };
  //タスク追加メソッド(KeyDown)
  const onKeyDownCreateNextTimeTodo = (e) => {
    if (e.keyCode === 13) {
      if (!todoText) {
        setInputState(true);
        return;
      }
      createNextTimeTodos();
    }
  };
  //タスク追加メソッド(Blur)
  const onBlurCreateNextTimeTodos = () => {
    if (!todoText) {
      setInputState(true);
      return;
    }
    createNextTimeTodos();
    setInputState(true);
  };
  //タスク複製メソッド
  const onClickDuplicateNextTimeTodo = (sortKey) => {
    const newNextTimeTodos = [...nextTimeTodos];
    const duplicateTodo = newNextTimeTodos[sortKey];
    newNextTimeTodos.splice(sortKey + 1, 0, duplicateTodo);
    const sortNewNextTimeTodos = newNextTimeTodos.map((todo, index) => {
      const newNextTimeTodo = {
        id: todo.id,
        todo: todo.todo,
        done: todo.done,
        sort_key: index,
      };
      return newNextTimeTodo;
    });
    setNextTimeTodos([...sortNewNextTimeTodos]);
  };
  //タスク削除メソッド
  const onClickDeleteNextTimeTodo = (sortKey) => {
    const newNextTimeTodos = nextTimeTodos.filter(
      (todo) => todo.sort_key !== sortKey
    );
    const sortNewNextTimeTodos = newNextTimeTodos.map((todo, index) => {
      const newNextTimeTodo = {
        id: todo.id,
        todo: todo.todo,
        done: todo.done,
        sort_key: index,
      };
      return newNextTimeTodo;
    });
    setNextTimeTodos([...sortNewNextTimeTodos]);
  };
  //タスク完了操作メソッド
  const onClickChangeTodoDone = (targetTodo) => {
    setNextTimeTodos(
      nextTimeTodos.map((todo) =>
        targetTodo === todo
          ? {
              id: targetTodo.id,
              todo: targetTodo.todo,
              done: !targetTodo.done,
              sort_key: targetTodo.sort_key,
            }
          : todo
      )
    );
  };
  //タスク編集状態制御メソッド
  const onClickEditTodo = (targetTodo) => {
    setEditKey(targetTodo.sort_key);
    setTodoText(targetTodo.todo);
  };
  const onChangeEditText = (e) => {
    setTodoText(e.target.value);
  };
  //編集した値のセットメソッド
  const onKeyDownEditNextTimeTodo = (e, sortKey) => {
    if (e.keyCode === 13) {
      if (!todoText) {
        setEditKey(null);
        return;
      }
      const editTodos = [...nextTimeTodos];
      editTodos[sortKey].todo = todoText;
      setNextTimeTodos(editTodos);
      setEditKey(null);
      setTodoText("");
    }
  };
  //編集した値のセットメソッド
  const onBlurEditNextTimeTodo = (sortKey) => {
    if (!todoText) {
      setEditKey(null);
      return;
    }
    const editTodos = [...nextTimeTodos];
    editTodos[sortKey].todo = todoText;
    setNextTimeTodos(editTodos);
    setEditKey(null);
    setTodoText("");
  };

  return (
    <div className="p-6 flex flex-col max-w-xs">
      <h1 className="font-bold text-yellow-400 text-2xl">今度する</h1>
      <div className="mt-4">
        {nextTimeTodos.map((todo) => {
          return (
            <div
              className="py-2 flex items-center justify-between group"
              key={todo.sort_key}
            >
              <div className="flex">
                <button
                  className={`w-6 h-6 mr-3 border border-solid border-2 border-gray-400 rounded-full relative ${
                    todo.done
                      ? "after:content-['●'] after:text-s after:absolute after:z-50 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-yellow-400"
                      : ""
                  }`}
                  onClick={() => onClickChangeTodoDone(todo)}
                ></button>
                {editKey === todo.sort_key ? (
                  <input
                    type="text"
                    className="outline-none caret-yellow-400 max-w-max"
                    onChange={onChangeEditText}
                    onKeyDown={(e) =>
                      onKeyDownEditNextTimeTodo(e, todo.sort_key)
                    }
                    onBlur={() => onBlurEditNextTimeTodo(todo.sort_key)}
                    value={todoText}
                    autoFocus
                  />
                ) : (
                  <button
                    onClick={() => onClickEditTodo(todo)}
                    className={`${
                      todo.done
                        ? "line-through decoration-gray-400 text-gray-400"
                        : ""
                    }`}
                  >
                    {todo.todo}
                  </button>
                )}
              </div>
              {todo.done || editKey === todo.sort_key ? null : (
                <div className="flex items-center gap-x-2 ml-3">
                  <DuplicateIcon
                    className="w-5 text-white group-hover:text-gray-400"
                    onClick={() => onClickDuplicateNextTimeTodo(todo.sort_key)}
                  />
                  <TrashIcon
                    className="w-5 text-white group-hover:text-gray-400"
                    onClick={() => onClickDeleteNextTimeTodo(todo.sort_key)}
                  />
                </div>
              )}
            </div>
          );
        })}
        <div className="py-2 flex items-center text-gray-400">
          {inputState ? (
            <div className="flex" onClick={onClickChangeInputState}>
              <PlusCircleIcon className="w-6 h-6" />
              <p className="text-gray-400">タスクを追加する</p>
            </div>
          ) : (
            <div className="flex items-center">
              <button className="w-6 h-6 border border-solid border-2 border-gray-400 rounded-full mr-3"></button>
              <input
                type="text"
                onKeyDown={onKeyDownCreateNextTimeTodo}
                onChange={onChangeTodoText}
                onBlur={onBlurCreateNextTimeTodos}
                value={todoText}
                className="caret-yellow-400 text-black outline-none"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
