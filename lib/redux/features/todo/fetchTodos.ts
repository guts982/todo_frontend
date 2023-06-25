import { FetchBaseQueryArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { BaseQueryApi, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError } from 'axios';
import { setApiProgress } from '../globalSlice';






// const baseUrl = "https://todoapi.amitkarn.com.np/api/";
const baseUrl = "http://127.0.0.1:4000/api/";

//Define a service using a base URL and expected endpoints
export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getAllTodos: builder.query<ITodo[], void>({
            // getAllTodos: builder.query({
            query: () => `todos`,

            transformResponse: (response: IResponse) => { console.log("transforming from:", response); return (response as { data: ITodo[] })?.data || [] },
            transformErrorResponse: (response: IResponse) => (response as { error: {} })?.error || {},
            providesTags: (result: ITodo[] | undefined) =>
                // is result available?
                result
                    ? // successful query
                    [
                        ...result.map((todo: ITodo) => ({ type: 'Todos', id: todo._id } as const)),
                        { type: 'Todos', id: 'LIST' },
                    ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Todos', id: 'LIST' }` is invalidated
                    [{ type: 'Todos', id: 'LIST' }],


        }),
        getTodo: builder.query<ITodo, string>({

            query: (todoId) => {
                
                if (todoId.trim() === "") throw Error("Todo id required")
                return `todos/${todoId}`
            },
            providesTags: (result, error, todoId) => [{ type: 'Todos', id:todoId }],
            // Pick out data and prevent nested properties in a hook or selector
            // transformResponse: (response) => { console.log("response:", response); return response.data.data; },
            // // Pick out error and prevent nested properties in a hook or selector
            // transformErrorResponse: (response) => response.error.data,
        }),
        getTodoQueue: builder.query<ITodo[], void>({
            query: () => `todos/queue`,
            transformResponse: (response: IResponse) => (response as { data: ITodo[] })?.data || [],
            transformErrorResponse: (response: IResponse) => (response as { error: {} })?.error || {},
            providesTags: (result) => [{ type: "Todos", id: "QUEUE" }]
        }),
        addTodo: builder.mutation<ITodo, Partial<ITodo>>({
            query: (body) => { return { url: `todos/create`, method: "POST", body } },
            invalidatesTags: [{ type: 'Todos', id: 'LIST' },{ type: 'Todos', id:"QUEUE" }],
        }),
        updateTodo: builder.mutation<ITodo, Partial<ITodo>>({
            query: (data) => {
                const { _id, ...body } = data;
                return { url: `todos/${_id}`, method: "PUT", body }
            },
            invalidatesTags: (result, error, { _id }) => [{ type: 'Todos', id: _id },{ type: 'Todos', id:"QUEUE" }],
        }),
        deleteTodo: builder.mutation<ITodo, string>({
            query: (todoId) => { return { url: `todos/${todoId}`, method: "DELETE" } },
            invalidatesTags: (result, error, todoId) => [{ type: 'Todos', id:todoId },{ type: 'Todos', id:"QUEUE" }],
        }),
        // getTodoQueueWithProgress:builder.query<any, { url: string }>({
        //     queryFn: async ({url}: { url: string }, api:BaseQueryApi) => {
        //         try {
        //             const result  = await axios.get(url, {
        //                 onDownloadProgress: download => {
        //                     let downloadProgress = Math.round((100* download.loaded) / (download?.total || download.loaded) );
        //                     api.dispatch(setApiProgress(downloadProgress));
        //                 }
        //             })
        //             return { data: result.data }; // Return the data object
        //         } catch (err) {
        //             const error: AxiosError<unknown> = err;
        //             throw error;
        //         }
        //     }
        // })
    })
});


export const { useGetAllTodosQuery, useGetTodoQuery, useGetTodoQueueQuery, useUpdateTodoMutation, useAddTodoMutation,  useDeleteTodoMutation } = todosApi

