import {v1} from "uuid";
import {addTodolistAT, RemoveTodolistAT, setTodolistsType} from "./todolists-reducer";
import {TaskType} from "../components/Todolist/Todolist";
import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

type RemoveTasksAT = ReturnType<typeof RemoveTasksAC>

type addTaskAT = ReturnType<typeof addTaskAC>

type changeStatusAT = ReturnType<typeof changeStatusAC>

type changeTitleAT = ReturnType<typeof changeTitleAC>

type setTasksAT = ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export type TaskActionType =
    RemoveTasksAT
    | addTaskAT
    | changeStatusAT
    | changeTitleAT
    | addTodolistAT
    | RemoveTodolistAT
    | setTodolistsType
    | setTasksAT

export const tasksReducer = (state = initialState, action: TaskActionType): TasksStateType => {

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
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
                    ...task, title: action.title
                } : task)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistID]: []
            }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        case 'SET_TODOLISTS':
            let copyState = {...state}
            action.todolists.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        case "SET-TASKS":
            return {
                ...state, [action.todolistID]: action.tasks
            }
        default:
            return state
    }
}

export const RemoveTasksAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE TASK", taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD TASK', title, todolistId} as const
}

export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE STATUS TASK', taskId, isDone, todolistId} as const
}

export const changeTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE TITLE TASK', taskId, title, todolistId} as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => {
    return {type: 'SET-TASKS', tasks, todolistID} as const
}

export const fetchTasksThunk = (id: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(id)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, id))
        })
}
