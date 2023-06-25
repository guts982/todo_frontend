
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";



export interface IInitState {
    entries:{
        [key: string]: IBasicTodo;
    }
}

let local=false;
if (typeof window !== 'undefined' && window.localStorage) {local=true}

let localBasicTodos:string | null = local ? localStorage.getItem("basic_todos") : null

const initialState:IInitState = localBasicTodos ? JSON.parse(localBasicTodos) : {
    entries: {}
}


export const basicTodoSlice = createSlice({
    name:"basicTodos",
    initialState,
    reducers: {
        addBasicTodo:(state, action:PayloadAction<IBasicTodo>)=>{
            const todo = action.payload;
            if(todo.title.trim() != "") {
                state.entries[todo.id] = todo;
                local && localStorage.setItem("basic_todos",JSON.stringify(state))
            }
           
        },
        toggleBasicTodo:(state,action:PayloadAction<string>)=>{
            const todoId = action.payload;
            const todo = state.entries[todoId];
            todo.completed = !todo.completed;
             local && localStorage.setItem("basic_todos",JSON.stringify(state))
        },
        deleteBasicTodo:(state,action:PayloadAction<string>)=>{
            delete state.entries[action.payload];
             local && localStorage.setItem("basic_todos",JSON.stringify(state))
        }
    }
});

// Action creators are generated for each case reducer function
export const {addBasicTodo, toggleBasicTodo, deleteBasicTodo} = basicTodoSlice.actions
export default basicTodoSlice.reducer
