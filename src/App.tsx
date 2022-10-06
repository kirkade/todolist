import React, {useState} from 'react';
import './App.css'
import {Todolist} from "./Todolist";

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'REACT', isDone: true},
        {id: 3, title: 'JS', isDone: false},
    ])

    const removeTask = (taskID: number) => {
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


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    )
}

export default App;
