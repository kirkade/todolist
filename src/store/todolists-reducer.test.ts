import {v1} from "uuid";
import {FilterValueType, TodoListsType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

//DATA
let todolistId1: string
let todolistId2: string
let startState: Array<TodoListsType>

beforeEach(() => {
    //DATA
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    //ACTION
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
    //EXPECT
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('todolist should be added', () => {

    //DATA
    let newTodolistTitle = 'New Todolist'

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    //ACTION
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))
    //EXPECT
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)

})

test('correct filter of todolist should be changed', () => {

    //DATA

    let newFilter: FilterValueType = 'completed'


    //ACTION
    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2))
    //EXPECT
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)

})

test('correct title of todolist should be changed', () => {

    //DATA

    let newTitle: string = 'New Title'

    //ACTION
    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTitle, todolistId2))
    //EXPECT
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)

})

