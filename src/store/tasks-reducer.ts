import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAT, RemoveTodolistAT} from "./todolists-reducer";

type RemoveTasksAT = ReturnType<typeof RemoveTasksAC>

type addTaskAT = ReturnType<typeof addTasksAC>

type changeStatusAT = ReturnType<typeof changeStatusAC>

type changeTitleAT = ReturnType<typeof changeTitleAC>


type ActionType = RemoveTasksAT | addTaskAT | changeStatusAT | changeTitleAT | addTodolistAT | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD TASK':
            let task = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistId]: [task, ...state[action.todolistId]]
            }
        case "CHANGE STATUS TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE TITLE TASK':
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].map(task=> task.id === action.taskId ? {
                    ...task, title:action.title
                }: task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
        [action.todolistID]:[]
            }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        default:
            throw new Error ('incorrect type')
    }
}

export const RemoveTasksAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE TASK", taskId, todolistId} as const
}

export const addTasksAC = (title: string, todolistId: string) => {
    return {type: 'ADD TASK', title, todolistId} as const
}

export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE STATUS TASK', taskId, isDone, todolistId} as const
}

export const changeTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE TITLE TASK', taskId, title, todolistId} as const
}
