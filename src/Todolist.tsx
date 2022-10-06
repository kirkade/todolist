import React from "react";
import styles from './Todolist.module.css'
import {FilterValueType} from "./App";

type TodoListType = {
    title: string,
    tasks: Array<TasksArrayType>,
    removeTask:(taskID:number)=>void,
    changeFilter:(value:FilterValueType)=>void,
}

type TasksArrayType = {
    id: number,
    title: string,
    isDone: boolean,
}


export const Todolist = (props: TodoListType) => {
    return (
        <div className={styles.todoBlock}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(el => <li key={el.id}>
                        <button onClick={()=>props.removeTask(el.id)}>x</button>
                        <input type="checkbox" checked={el.isDone}/><span>{el.title}</span>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )

}