import React, {useState} from "react";
import styles from './Todolist.module.css'
import {FilterValueType} from "./App";

type TodoListType = {
    title: string,
    tasks: Array<TasksArrayType>,
    removeTask: (taskID: string) => void,
    changeFilter: (value: FilterValueType) => void,
    addTask: (title: string) => void,
}

type TasksArrayType = {
    id: string,
    title: string,
    isDone: boolean,
}


export const Todolist = (props: TodoListType) => {

    const tasksMap = props.tasks.map(el => {

        const onClickHandler = () => props.removeTask(el.id)

        return (
            <li key={el.id}>
                <button onClick={onClickHandler}>x</button>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </li>)
    })


    let [title, setTitle] = useState('')

    const onClickAddTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onKeyUpInputHandler = (event: React.KeyboardEvent<HTMLElement>) => {
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
            </div>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )

}