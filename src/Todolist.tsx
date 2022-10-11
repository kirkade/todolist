import React, {ChangeEvent, ChangeEventHandler, useState} from "react";
import styles from './Todolist.module.css'
import {FilterValueType} from "./App";
import {Checkbox} from "./components/Checkbox";

type TodoListType = {
    todolistId:string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: string, todolistId:string) => void,
    changeTodolistFilter: (value: FilterValueType, todolistId:string) => void,
    addTask: (title: string, todolistId:string) => void,
    changeStatus: (id: string, isDone: boolean, todolistId:string) => void
    filter: FilterValueType
    removeTodolist: (todolistId:string)=>void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const Todolist = (props: TodoListType) => {

    let [title, setTitle] = useState('')

    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (elId: string, isDone:boolean,todolistId:string) => {
        props.changeStatus(elId, isDone, props.todolistId)
    }

    const tasksMap = props.tasks.map(el => {

        const onClickHandler = () => props.removeTask(el.id,props.todolistId)

        return (
            <li key={el.id} className={el.isDone ? 'isDone' : ''}>
                <Checkbox checked={el.isDone} callback={(isDone)=>onChangeHandler(el.id,isDone,props.todolistId)}/>
                <button onClick={onClickHandler}>x</button>
                {/*<input type="checkbox" checked={el.isDone} onChange={(event) => onChangeHandler(el.id, event.currentTarget.checked)}/>*/}
                <span>{el.title}</span>
            </li>)
    })

    const tasksList = props.tasks.length
        ? {tasksMap}
        : <span>Error</span>

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title,props.todolistId)
            setTitle('')
        } else {
            setError('You need to have letters in task')
        }
    }

    const onKeyUpInputHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addTask(title,props.todolistId)
            setTitle('')
        }
    }

    const onChangeInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onAllClickHandler = () => {
        props.changeTodolistFilter('all',props.todolistId)
    }

    const onActiveClickHandler = () => {
        props.changeTodolistFilter('active',props.todolistId)
    }

    const onCompletedClickHandler = () => {
        props.changeTodolistFilter('completed',props.todolistId)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    return (
        <div className={styles.todoBlock}>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input className={error ? styles.error : ''} value={title} onChange={onChangeInputHandler}
                       onKeyUp={onKeyUpInputHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'activeFilter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'activeFilter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'activeFilter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )

}