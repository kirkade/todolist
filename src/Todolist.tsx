import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

export function Todolist(props: PropsType) {

    let [taskTitle, setTaskTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(taskTitle)
        setTaskTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            return addTaskHandler()
        }
    }

    const bigChangeFilter = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    const mapTasks = props.tasks.map(t => {

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => removeTaskHandler(t.id)}>x</button>
            </li>
        )
    })


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={taskTitle} onChange={onChangeHandler} onKeyUp={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {mapTasks}
        </ul>
        <div>
            <button onClick={() => {
                bigChangeFilter('all')
            }}> All
            </button>
            <button onClick={() => {
                bigChangeFilter('active')
            }}> Active
            </button>
            <button onClick={() => {
                bigChangeFilter('completed')
            }}> Completed
            </button>
        </div>
    </div>
}
