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

    },

    getTasks(todolistId: string) {
        return instance
            .get(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance
            .post(`todo-lists/${todolistId}/tasks`,{title})
    },

    updateTaskTitle(todolistId: string, title: string, taskId:string) {
        return instance
            .put(`todo-lists/${todolistId}/tasks/${taskId}`, {title})

    },

    deleteTask(todolistId:string, taskId: string) {
        return instance
            .delete(`todo-lists/${todolistId}/tasks/${taskId}`)
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

