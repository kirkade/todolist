import axios, { AxiosResponse } from 'axios'

import {ModelType} from "../stories/todolists-api.stories";
import {TaskType} from "../components/Todolist/Todolist";


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

    getTodolists() {
        return instance
            .get<TodolistType[]>(`todo-lists`)

    },

    getTasks(todolistId: string) {
        return instance
            .get(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance
            .post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, model: ModelType) {
        return instance
            .put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },


    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
    filter?:string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export type TaskTypeApi = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
