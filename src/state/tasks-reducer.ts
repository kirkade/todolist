import {addTodolistAT, RemoveTodolistAT, setTodolistsType} from "./todolists-reducer";
import {TaskType} from "../components/Todolist/Todolist";
import {Dispatch} from "redux";
import {TaskStatuses, todolistAPI} from "../api/todolist-api";
import {AppRootStateType} from "./store";

export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

type RemoveTasksAT = ReturnType<typeof removeTaskAC>

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
        case 'REMOVE_TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}
        case 'ADD_TASK':
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        case "CHANGE_STATUS_TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        case 'CHANGE_TITLE_TASK':
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
        case "SET_TASKS":
            return {
                ...state, [action.todolistID]: action.tasks
            }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE_TASK", taskId, todolistId} as const
}

export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD_TASK', task} as const
}

export const changeStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE_STATUS_TASK', taskId, status, todolistId} as const
}

export const changeTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE_TITLE_TASK', taskId, title, todolistId} as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistID: string) => {
    return {type: 'SET_TASKS', tasks, todolistID} as const
}

export const fetchTasksThunk = (id: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(id)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, id))
        })
}

export const removeTaskTC = (taskID: string, todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistID, taskID)
        .then((res) => {
            dispatch(removeTaskAC(taskID, todolistID))
        })
}

export const addTaskTC = (title: string, todolistID: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistID, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export const updateTaskStatusTC = (taskID: string, todolistID: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const allTasksFromState = getState().tasks
    const currentTasks = allTasksFromState[todolistID]
    const task = currentTasks.find(t => t.id === taskID)

    if (task) {
        todolistAPI.updateTask(todolistID, taskID, {
            title: task.title,
            status: status,
            completed: task.completed,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate
        })
            .then((res) => {
                dispatch(changeStatusAC(taskID, res.data.data.status, todolistID))
            })
    }

}
