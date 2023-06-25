"use client";
import { useState, MouseEvent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/redux/store";
import {
  addBasicTodo,
  toggleBasicTodo,
  deleteBasicTodo,
} from "@/lib/redux/features/todo/basicTodoSlice";
import { generateRandomId } from "@/lib/helpers";

const BasicTodo = () => {
  const [title, setTitle] = useState("");
  const todos = useSelector((state: RootState) => state.basicTodos.entries);
  const themes = useSelector((state:RootState)=>state.themes);
  const dispatch = useDispatch();


  const handleAddTodo = (e: MouseEvent<HTMLButtonElement>) => {
    const todo = {
      id: generateRandomId(5),
      title: title,
      completed: false,
    };
    dispatch(addBasicTodo(todo));
    setTitle("")
  };

  const handleDeleteTodo= (todoId:string) => {
    dispatch(deleteBasicTodo(todoId));
  };

  const handleToggleTodo = (todoId:string) => {
    dispatch(toggleBasicTodo(todoId));
  }


  return (
    <div className={`bg-glassmorphism-1 border shadow-md p-6  rounded w-full min-h-[400px] flex flex-col justify-start items-center gap-4`}
    
    >
      {/* Add Todo */}
      <div className="flex justify-center gap-2 items-center w-full flex-col md:flex-row">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-white px-3 py-2 border-2 w-full md:max-w-10/12 "
        />
        <button
          onClick={handleAddTodo}
          className="px-3 py-2 bg-blue-400 text-white font-semibold hover:shadow-lg hover:bg-blue-900"
        >
          Add
        </button>
      </div>

      {/* List Todos */}
      <div className="transition-all w-full flex justify-between items-center  flex-col gap-5 ">
        {Object.entries(todos).map(([key, todo]) => (
          <div key={key} className="w-full flex justify-between items-center">
            <div className="flex justify-center items-center gap-2">
              <input
                type="checkbox"
                name="completed"
                className="bg-white w-6"
                defaultChecked={todo.completed}
                onChange={(e)=>handleToggleTodo(todo.id)}
              />
              <div className="font-normal text-white text-lg ">{todo.title}</div>
            </div>

            <button type="button" onClick={(e)=>handleDeleteTodo(todo.id)} className="bg-red-600 text-white p-2 ">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicTodo;
