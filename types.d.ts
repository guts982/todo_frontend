interface Window {
    localStorage: Storage;
  }

interface IBasicTodo {
    id:string,
    title:string,
    completed:boolean
}

interface ITodo {
    _id: string;
    id?: string;
    title: string;
    user?: string;
    completed: boolean;
    parent?: string | null;
    siblings?: {
        previous?: string | null;
        next?: string | null;
    },
    dateCompleted?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    children?: ITodo[] | null;
}


interface IResponse {
    status:number;
    data:unknown;
    statusText: "success" | "error";
    datas: ITodo[] | 
    {
        result: ITodo[] | {};
        _metadata: {
            page: number;
            per_page: number;
            page_count: number;
            total_count: number;
            has_next: boolean;
            has_previous: boolean;
            is_first: boolean;
            is_last: boolean;
            links:
            {
                self: string;
                first: string;
                previous: string | null;
                next: string | null;
                last: string;
            }
        };
    } | {} | unknown;
    error: {} | unknown |
    {
        name: string;
        messsage: string;
        path?: string
    };
    message: string;
}