import {FilterValueType, TodoListsType} from "../App";
import {v1} from "uuid";

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

type ActionType = RemoveTodolistAT | addTodolistAT | changeTodolistFilterAT | changeTodolistTitleAT

export const todolistsReducer = (todolists: Array<TodoListsType>, action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.todolistID)
        case "ADD-TODOLIST":
            const newTodolist: TodoListsType = {
                id: action.todolistID,
                title: action.title,
                filter: 'all'
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
export const changeTodolistTitleAC = (title: string, id: string): changeTodolistTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title: title,
    todolistID: id
})