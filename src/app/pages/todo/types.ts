export interface ITodoListResponseBody {
    isSuccess: boolean;
    data: ITodoData[];
}

export interface ITodoData {
    completed?: boolean,
    created_at: string,
    created_by?: {
        id: string,
        username: string
    },
    description: string,
    id: string,
    no?: number,
    title: string,
    updated_at: string
};