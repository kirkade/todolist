import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC, tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodolistAC} from "./todolists-reducer";
import {TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                completed: false,
                description: '',
                status: 0,
                priority: 0,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: '',
                order: 0,
                addedDate: new Date()
            },
            {
                id: '2',
                title: 'JS',
                completed: true,
                description: '',
                status: 0,
                priority: 0,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: '',
                order: 0,
                addedDate: new Date()
            },
            {
                id: '3',
                title: 'React',
                completed: false,
                description: '',
                status: 0,
                priority: 0,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: '',
                order: 0,
                addedDate: new Date()
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                completed: false,
                description: '',
                status: 0,
                priority: 0,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: '',
                order: 0,
                addedDate: new Date()
            },
            {
                id: '2',
                title: 'milk',
                completed: true,
                description: '',
                status: 0,
                priority: 0,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: '',
                order: 0,
                addedDate: new Date()
            },
            {
                id: '3',
                title: 'tea',
                completed: false,
                description: '',
                status: 0,
                priority: 0,
                startDate: new Date(),
                deadline: new Date(),
                todoListId: '',
                order: 0,
                addedDate: new Date()
            }
        ]
    }
})

test.skip('correct task should be deleted from correct array', () => {
    //ACTION
    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    //EXPECT
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})
test.skip('correct task should be added to correct array', () => {
    //ACTION
    const action = addTaskAC({
        id: 'todolistId2',
        title: 'juce',
        completed: false,
        description: '',
        status: 0,
        priority: 0,
        startDate: new Date(),
        deadline: new Date(),
        todoListId: '',
        order: 0,
        addedDate: new Date()
    })
    const endState = tasksReducer(startState, action)
    //EXPECT
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].completed).toBe(false)
})
test.skip('status of specified task should be changed', () => {
    //ACTION
    const action = changeStatusAC('2', TaskStatuses.New, 'todolistId2')
    const endState = tasksReducer(startState, action)
    //EXPECT
    expect(endState['todolistId1'][0].completed).toBe(false)
    expect(endState['todolistId2'][1].completed).toBe(false)
})

test.skip('title of specified task should be changed', () => {
    //ACTION
    const action = changeTitleAC('2', 'New Title', 'todolistId2')
    const endState = tasksReducer(startState, action)
    //EXPECT
    expect(endState['todolistId1'][0].title).toBe('CSS')
    expect(endState['todolistId2'][1].title).toBe('New Title')
})

test('new array should be added when new todolist is added', () => {
    //ACTION
    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    //EXPECT
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

