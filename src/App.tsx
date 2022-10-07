import React, {useState} from 'react';
import './App.css'
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'REACT', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
    ])

    const removeTask = (taskID: string) => {
        let filteredTasks = tasks.filter(el => el.id != taskID)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodoList = tasks

    if (filter === 'active') {
        tasksForTodoList = tasks.filter(el => el.isDone === false)
    }

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(el => el.isDone === true)
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    const changeStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;
