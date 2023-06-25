"use client";
import {
  useState,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  forwardRef,
  useRef,
  MutableRefObject,
  RefObject,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";
import {
  useAddTodoMutation,
  useGetAllTodosQuery,
  useGetTodoQueueQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/lib/redux/features/todo/fetchTodos";
import { toggleLoading } from "@/lib/redux/features/globalSlice";
import { TbCircleDotted } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import Loading from "./Loading";
import { formatDate } from "@/lib/helpers";

const MAX_NESTING = 3;
const MAX_WIDTH_LIMIT_LEVEL = 3;

const Advanced = () => {
  const globalLoading = useSelector((state: RootState) => state.global.loading);
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="bg-white ">{process.env.NEXT_PUBLIC_API_URL}</div>
      {globalLoading && <Loading />}

      <ListTodos ref={listRef} />
      <RootInput listRef={listRef} />
    </div>
  );
};

const ListTodos = forwardRef<HTMLDivElement, any>(({}, ref) => {
  const { data: todos, isLoading, isFetching } = useGetTodoQueueQuery();

  return (
    <div
      ref={ref}
      className="mx-auto  py-10 flex flex-col justify-start items-center  w-full gap-[5px] h-[78vh] absolute top-[7vh] overflow-y-scroll cust-sb "
    >
      {isLoading ? (
        <Loading />
      ) : todos?.length ? (
        todos?.map((todo, index) => (
          <SingleTodo
            key={todo._id}
            index={index + 1}
            todo={todo}
            isFetching={isFetching}
          />
        ))
      ) : (
        "No todos yet!"
      )}
      {isFetching && <Loading />}
    </div>
  );
});

ListTodos.displayName = "ListTodos";

const SingleTodo = ({
  todo,
  parent,
  level,
  index,
  isFetching = false,
}: {
  todo: ITodo;
  parent?: string | null;
  level?: number;
  index: number;
  isFetching?: boolean;
}) => {
  let nestedLevel = level || 0;
  const [title, setTitle] = useState(todo.title + "-" + nestedLevel);
  const [completed, setCompleted] = useState(todo.completed);
  const [panelState, setPanelState] = useState(false);

  const [updateTodo, { isLoading: loadingUpdate, data: updateResult }] =
    useUpdateTodoMutation();
  const [deleteTodo, { isLoading: loadingDelete, data: deleteResult }] =
    useDeleteTodoMutation();

  //update completed status
  const handleUpdateCompleted = (e: ChangeEvent<HTMLInputElement>) => {
    const body = { ...todo, id: todo._id, completed: !completed };
    updateTodo(body);
    setCompleted((o) => !o);
  };

  //update title
  const handleTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const body = { ...todo, id: todo._id, title: title };
      updateTodo(body);
    }
  };
  //delete todo
  const handleDeleteTodo = (e: MouseEvent<HTMLButtonElement>) => {
    deleteTodo(todo._id);
  };

  // const formattedDate =  (new Date(todo.updatedAt)).toLocaleString() //new Intl.DateTimeFormat('en-US', dateOptions).format(new Date(todo.updatedAt));
  const formattedDate = formatDate(todo.updatedAt);

  return (
    <div
      className={`  ${
        parent
          ? nestedLevel > MAX_WIDTH_LIMIT_LEVEL
            ? "w-full"
            : "w-[98%]"
          : "max-w-11/12 w-11/12 sm:w-10/12 md:w-9/12 lg:w-8-12"
      }  
      ${!todo.siblings?.previous && "mt-1"}
      ${
        !parent && nestedLevel == 0 && panelState
          ? index % 2 == 0
            ? "bg-gm bg-gm-black "
            : "bg-gm bg-gm-black"
          : ""
      } 
     
      `}
    >
      <div
        className={`w-full flex flex-wrap items-center justify-center    rounded px-3 sm:px-4 bg-gm
      ${index % 2 == 0 ? "bg-gm-gray " : " bg-gm-purple"}
      ${!parent && ""}
       `}
      >
        {loadingUpdate ? (
          <TbCircleDotted className="text-white font-extrabold" />
        ) : (
          <input
            type="checkbox"
            name="completed"
            className={` ${
              loadingUpdate && "accent-black "
            }  accent-green-400  h-5 w-5 rounded-full`}
            checked={completed}
            onChange={handleUpdateCompleted}
            disabled={loadingUpdate || isFetching}
          />
        )}

        <input
          type="text"
          className=" relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l  border-solid border-neutral-300 bg-transparent 
      focus:outline-none outline-0 border-0
        text-lg  leading-[1.6] text-white outline-none transition duration-200 ease-in-out 
      focus:z-[3]  focus:text-white    dark:text-white
        p-3 py-2 font-thin  placeholder:text-white "
          placeholder={todo.title}
          aria-label={todo.title}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={handleTitleKeyDown}
          disabled={loadingUpdate || isFetching}
        />

        {/* <div className="text-slate-300 font-thin  mr-2" style={{fontSize:"0.8rem"}}  >{formattedDate}</div> */}

        <button
          className="btn-lawrencium  p-2  text-neutral-100  rounded-md   
      text-lg border-[1.5px]  hover:text-indigo-600"
          type="button"
          disabled={loadingDelete || isFetching}
          onClick={handleDeleteTodo}
        >
          <AiFillDelete />
        </button>
        <button
          className="btn-lawrencium ml-1  p-2  text-neutral-100  rounded-md   
      text-lg hover:text-indigo-600"
          type="button"
          onClick={(e) => setPanelState((o) => !o)}
        >
          {panelState ? (
            <FaChevronUp className="text-yellow-300" />
          ) : (
            <FaChevronDown />
          )}
        </button>
      </div>
      <div
        className="text-slate-200 font-light mx-2 text-right "
        style={{ fontSize: ".7rem" }}
      >
        {formattedDate}
      </div>
      {panelState && (
        <div
          className={`w-full flex justify-end flex-col items-end gap-1 
       
        `}
        >
          {todo.children?.map((child, i) => {
            return (
              <SingleTodo
                key={child._id}
                parent={child._id}
                todo={child}
                level={nestedLevel + 1}
                index={i + 1}
                isFetching={isFetching}
              />
            );
          })}
          {nestedLevel < MAX_NESTING && (
            <RootInput parent={todo._id} isFetching={isFetching} />
          )}
        </div>
      )}
    </div>
  );
};

const RootInput = ({
  listRef,
  parent,
  level,
  isFetching = false,
}: {
  listRef?: RefObject<HTMLDivElement> | null;
  parent?: string | null;
  level?: number;
  isFetching?: boolean;
}) => {
  let nestedLevel = level || 0;
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const [addTodo, { isLoading: loadingAdd, data: addResult }] =
    useAddTodoMutation();

  const handleAddTodo = () => {
    dispatch(toggleLoading(true));
    const body = { title: title, parent: parent || null };
    addTodo(body);
    setTitle("");
    if (listRef?.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
    dispatch(toggleLoading(false));
  };

  const handleTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div
      className={` flex flex-wrap items-stretch   bg-gm
      ${
        parent && nestedLevel > MAX_WIDTH_LIMIT_LEVEL
          ? nestedLevel % 2 == 0
            ? "   bg-gm-black"
            : " bg-gm-black"
          : " bg-gm-black"
      }
       ${
         parent
           ? nestedLevel == 0
             ? "w-[98%] mb-1 mt-1"
             : "w-[98%] mb-1 mt-0"
           : " w-11/12 fixed bottom-14 mx-4"
       }   rounded`}
    >
      <button
        className={`btn-lawrencium m-3  px-2   ${
          parent ? "text-yellow-300" : "text-neutral-100"
        } rounded-md   
        `}
        type="button"
        onClick={(e) => handleAddTodo()}
        disabled={loadingAdd || isFetching}
      >
        <FaPlus />
      </button>

      <input
        type="text"
        className={` relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l  border-solid border-neutral-300 bg-transparent 
        focus:outline-none outline-0 border-0
         text-lg  leading-[1.6] text-white outline-none transition duration-200 ease-in-out 
        focus:z-[3]  focus:text-white    dark:text-white
         dark:placeholder:text-white p-4 ${
           parent ? "py-2 mt-1" : "py-4"
         } font-thin placeholder:text-neutral-300   `}
        placeholder="New Todo Title"
        aria-label="New Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleTitleKeyDown}
        disabled={loadingAdd || isFetching}
      />

      <button
        className={`btn-lawrencium m-3  px-2   ${
          parent ? "text-yellow-300" : "text-neutral-100"
        } rounded-md   
       `}
        type="button"
        onClick={(e) => handleAddTodo()}
        disabled={loadingAdd || isFetching}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Advanced;
