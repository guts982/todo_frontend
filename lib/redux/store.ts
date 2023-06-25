import { configureStore, combineReducers } from "@reduxjs/toolkit";
import basicTodoReducer from "./features/todo/basicTodoSlice";
import themeSlice from "./features/todo/themeSlice";
import { todosApi } from "./features/todo/fetchTodos";
import  {setupListeners} from "@reduxjs/toolkit/query";
import globalSlice from "./features/globalSlice";

const rootReducer = combineReducers({
    themes: themeSlice,
    basicTodos: basicTodoReducer,
    global: globalSlice,
    //Add the generated reducer as a specific top-level slice
    [todosApi.reducerPath]:todosApi.reducer,
})

export const store = configureStore({ 
    reducer: rootReducer,
    devTools:true,
    //Adding the api middleware enables caching, invalidation, polling
    //and other useful features of 'rtk-query'
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware)
 });

//Infer the "RootState" and "AppDispatch" types from the store itself
 export type RootState = ReturnType<typeof store.getState>

 //Inferred type: 
 export type AppDispatch = typeof store.dispatch

 //optional, but required for refetchOnFocus/refetchOnReconnect behaviors
 //setupListeners - takes an optional callback as the 2nd arg for customization
 setupListeners(store.dispatch);


 



