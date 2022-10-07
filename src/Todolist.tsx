import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import styles from './Todolist.module.css'
import {FilterValueType} from "./App";

type TodoListType = {
    title: string,
    tasks: Array<TasksArrayType>,
    removeTask: (taskID: string) => void,
    changeFilter: (value: FilterValueType) => void,
    addTask: (title: string) => void,
    changeStatus: (id: string, isDone: boolean) => void
    filter:string,
}

type TasksArrayType = {
    id: string,
    title: string,
    isDone: boolean,
}


export const Todolist = (props: TodoListType) => {


    const tasksMap = props.tasks.map(el => {

        const onClickHandler = () => props.removeTask(el.id)

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            props.changeStatus(el.id, newIsDoneValue)

        }

        return (
            <li key={el.id} className={el.isDone ? 'isDone' : ''}>
                <button onClick={onClickHandler}>x</button>
                <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                <span>{el.title}</span>
            </li>)
    })


    let [title, setTitle] = useState('')

    let [error,setError] = useState<string|null>(null)

    const onClickAddTaskHandler = () => {
        if(title.trim() !== '') {
            props.addTask(title)
            setTitle('')
        } else {
            setError('You need to have letters in task')
        }
    }

    const onKeyUpInputHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }

    const onChangeInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    return (
        <div className={styles.todoBlock}>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler} onKeyUp={onKeyUpInputHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'activeFilter' : ''}
                    onClick={onAllClickHandler}>All</button>
                <button
                    className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
                <button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )

}