import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '84adbf01-f9cc-4ff1-8a31-a9f24ebcbf65'
    },
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance
            .put<ResponseType>(`todo-lists/${todolistId}`, {title},)

    },

    deleteTodolist(todolistId: string) {
        return instance
            .delete<ResponseType>(`todo-lists/${todolistId}`)

    },

    createTodolist(title: string) {
        return instance
            .post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})

    },

    getTodolist() {
        return instance
            .get<TodolistType[]>(`todo-lists`)

    }
}

type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

