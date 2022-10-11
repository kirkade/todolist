import React, {useState} from 'react';
import './App.css'
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
            [todolistId_1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'REACT', isDone: true},
                {id: v1(), title: 'JS', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
                {id: v1(), title: 'CSS', isDone: false},
            ],
            [todolistId_2]: [
                {id: v1(), title: 'Water', isDone: true},
                {id: v1(), title: 'Beer', isDone: true},
                {id: v1(), title: 'Toilet paper', isDone: false},
                {id: v1(), title: 'Buckwheat', isDone: false},
                {id: v1(), title: 'Meet', isDone: false},
            ]
        })

    const removeTask = (taskID: string, todolistId: string) => {
        const copyTasks = {...tasks}
        copyTasks[todolistId] = copyTasks[todolistId].filter(el => el.id != taskID)
        setTasks(copyTasks)

        // setTasks({...tasks, [todolistId]:tasks[todolistId].filter(el => el.id != taskID)})

    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false};

        setTasks({...tasks,
            [todolistId]:[task, ...tasks[todolistId]]})
    }

    const changeStatus = (id: string, isDone: boolean,todolistId: string) => {

        // 1st variation
        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(t=>t.id === id ? {...t,isDone:isDone} : t)

        })

        //2nd variation
        // let task = tasks.find(t => t.id === id);
        // if (task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }
    }

    const changeTodolistFilter = (filter: FilterValueType,todolistId: string) => {
        setTodolists(todolists.map(tl=>tl.id === todolistId ? {...tl, filter:filter} : tl))
    }

    const removeTodolist = (todolistId:string) => {
        setTodolists(todolists.filter(tl=>tl.id !== todolistId))
        delete tasks[todolistId]
    }

    const getFiltered = (t:Array<TaskType>,filter:FilterValueType) => {
        let tasksForTodoList = t

        if (filter === 'active') {
            tasksForTodoList = t.filter(el => el.isDone === false)
        }

        if (filter === 'completed') {
            tasksForTodoList = t.filter(el => el.isDone === true)
        }
        return tasksForTodoList
    }

    const todolistComponents = todolists.map(tl=>{


        return (
            <Todolist
                      removeTask={removeTask}
                      changeTodolistFilter={changeTodolistFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      removeTodolist={removeTodolist}

                      tasks={getFiltered(tasks[tl.id],tl.filter)}
                      title={tl.title}
                      filter={tl.filter}
                      todolistId={tl.id}
                      key={tl.id}
            />
        )
    })

    //GUI
    return (
        <div className="App">
            {todolistComponents}
        </div>
    )
}

export default App;
