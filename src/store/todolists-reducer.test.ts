import {v1} from "uuid";
import {FilterValueType, TodoListsType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {

    //DATA
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    //ACTION
    const endState = todolistsReducer(startState,RemoveTodolistAC(todolistId1))
    //EXPECT
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('todolist should be added', () => {

    //DATA
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    //ACTION
    const endState = todolistsReducer(startState,addTodolistAC(newTodolistTitle))
    //EXPECT
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should be changed', () => {

    //DATA
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newFilter:FilterValueType = 'completed'

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    //ACTION
    const endState = todolistsReducer(startState,changeTodolistFilterAC(newFilter,todolistId2))
    //EXPECT
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})

test('correct title of todolist should be changed', () => {

    //DATA
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTitle:string = 'New Title'

    const startState: Array<TodoListsType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    //ACTION
    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTitle,todolistId2))
    //EXPECT
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)

})

