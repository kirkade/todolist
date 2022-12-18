import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todolistID: string
}

export type addTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}

type changeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValueType
    todolistID: string
}

type changeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todolistID: string
}

// export type TodoListType = {
//     id: string,
//     title: string,
//     filter: FilterValueType,
// }

export type setTodolistsType = ReturnType<typeof setTodolistsAC>


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistsActionType =
    RemoveTodolistAT
    | addTodolistAT
    | changeTodolistFilterAT
    | changeTodolistTitleAT
    | setTodolistsType


const initialState: Array<TodolistType> = []

export const todolistsReducer = (todolists = initialState, action: TodolistsActionType): Array<TodolistType> => {

    switch (action.type) {
        case 'SET_TODOLISTS':
            return action.todolists.map((tl)=>({...tl, filter:'all'}))


        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todolistID)
        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.todolistID,
                title: action.title,
                addedDate: new Date(),
                order:0
            }
            return [...todolists, newTodolist]
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => ({type: "REMOVE-TODOLIST", todolistID: id})
export const addTodolistAC = (title: string): addTodolistAT => ({type: "ADD-TODOLIST", title: title, todolistID: v1()})
export const changeTodolistFilterAC = (filter: FilterValueType, id: string): changeTodolistFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter: filter,
    todolistID: id
})
export const changeTodolistTitleAC = (title: string, id: string): changeTodolistTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        todolistID: id
    } as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {
        type: 'SET_TODOLISTS', todolists
    } as const
}

export const fetchTodolistThunk = () => (dispatch:Dispatch) => {
    todolistAPI.getTodolists()
        .then((res)=>{
            dispatch(setTodolistsAC(res.data))
        })
}