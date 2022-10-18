import React from "react";
import styles from './Todolist.module.css'
import {FilterValueType} from "./App";
import {Checkbox} from "./components/Checkbox";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

type TodoListType = {
    todolistId: string,
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: string, todolistId: string) => void,
    changeTodolistFilter: (value: FilterValueType, todolistId: string) => void,
    addTask: (title: string, todolistId: string) => void,
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string,title:string,todolistId: string)=> void
    changeTodolistTitle:(title: string, todolistId: string) => void,
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const Todolist = (props: TodoListType) => {


    const onChangeHandler = (elId: string, isDone: boolean, todolistId: string) => {
        props.changeStatus(elId, isDone, todolistId)
    }

    const tasksMap = props.tasks.map(el => {

        const onClickHandler = () => props.removeTask(el.id, props.todolistId)
        const changeTaskTitle = (title:string) => {
            props.changeTaskTitle(el.id,title,props.todolistId)
        }

        return (
            <li key={el.id} className={el.isDone ? 'isDone' : ''}>
                <Checkbox checked={el.isDone} callback={(isDone) => onChangeHandler(el.id, isDone, props.todolistId)}/>
                <button onClick={onClickHandler}>x</button>
                <EditableSpan title={el.title} changeTitle={changeTaskTitle}/>
            </li>)
    })


    const onAllClickHandler = () => {
        props.changeTodolistFilter('all', props.todolistId)
    }

    const onActiveClickHandler = () => {
        props.changeTodolistFilter('active', props.todolistId)
    }

    const onCompletedClickHandler = () => {
        props.changeTodolistFilter('completed', props.todolistId)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    const changeTodolistTitle = (title:string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }

    return (
        <div className={styles.todoBlock}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
                <AddItemForm addItem={addTask}/>


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