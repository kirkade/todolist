import React, {ChangeEvent, FC, useEffect} from "react";
import styles from './Todolist.module.css'

import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {Delete, HighlightOff} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../state/store";
import {addTaskTC, changeTitleAC, fetchTasksThunk, removeTaskTC, updateTaskStatusTC} from "../../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, RemoveTodolistAC,} from "../../state/todolists-reducer";
import {TaskStatuses, TodolistType} from "../../api/todolist-api";

export type TodolistPropsType = {
    todolist: TodolistType,
}


export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority:number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

export const Todolist: FC<TodolistPropsType> = ({todolist}) => {

    let {id,filter,title} = todolist

    useEffect(()=>{
        dispatch(fetchTasksThunk(id))
    },[])

    let tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[id])

    const dispatch = AppDispatch()

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.completed)
    }

    if (filter === 'completed') {
        tasks = tasks.filter(t => t.completed)
    }

    const tasksMap = tasks.map(task => {

        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = event.currentTarget.checked
            console.log(newIsDoneValue)
            dispatch(updateTaskStatusTC(task.id, id,newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
        }
        const onClickHandler = () => dispatch(removeTaskTC(task.id, id))
        const changeTaskTitle = (title: string) => {dispatch(changeTitleAC(task.id, title, id))}

        return (
            <ListItem
                key={task.id}
                className={task.status === TaskStatuses.Completed ? 'isDone' : ''}
                style={{padding: '0px', justifyContent: 'space-between'}}
            >
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
                    onChange={onChangeHandler}
                />


                <EditableSpan title={task.title} onChange={changeTaskTitle}/>
                <IconButton size={'small'} onClick={onClickHandler}><HighlightOff/></IconButton>
            </ListItem>)
    })

    const onAllClickHandler = () => {dispatch(changeTodolistFilterAC('all', id))}
    const onActiveClickHandler = () => {dispatch(changeTodolistFilterAC('active', id))}
    const onCompletedClickHandler = () => {dispatch(changeTodolistFilterAC('completed', id))}

    const removeTodolist = () => {dispatch(RemoveTodolistAC(id))}
    const addTask = (title: string) => {dispatch(addTaskTC(title, id))}
    const changeTodolistTitle = (title: string) => {dispatch(changeTodolistTitleAC(title, id))}

    return (
        <div className={styles.todoBlock}>
            <Typography variant={"h5"} align={'center'} fontWeight={'bold'} color={'primary'}
                        style={{marginBottom: '20px'}}>

                <EditableSpan title={title} onChange={changeTodolistTitle}/>
                <IconButton size={'small'} onClick={removeTodolist}><Delete/></IconButton>

            </Typography>

            <AddItemForm addItem={addTask}/>

            <List>
                {tasksMap}
            </List>

            <div>
                <ButtonGroup disableElevation variant="contained" size={"small"} fullWidth>
                    <Button
                        color={filter === 'all' ? 'secondary' : 'primary'}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        color={filter === 'active' ? 'secondary' : 'primary'}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )

}