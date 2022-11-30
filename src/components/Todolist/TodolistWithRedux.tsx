import React, {ChangeEvent, FC} from "react";
import styles from './Todolist.module.css'
import {TodoListType} from "../../App";

import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {Delete, HighlightOff} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTaskAC, changeStatusAC, changeTitleAC, RemoveTasksAC} from "../../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, RemoveTodolistAC} from "../../state/todolists-reducer";

export type TodoListTypeWithReduxPropsType = {
    todolist: TodoListType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const TodolistWithRedux: FC<TodoListTypeWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[id])
    const dispatch = useDispatch()

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const tasksMap = tasks.map(task => {

        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {

            let newIsDone = event.currentTarget.checked
            dispatch(changeStatusAC(task.id, newIsDone, id))
        }
        const onClickHandler = () => dispatch(RemoveTasksAC(task.id, id))
        const changeTaskTitle = (title: string) => {dispatch(changeTitleAC(task.id, title, id))}

        return (
            <ListItem
                key={task.id}
                className={task.isDone ? 'isDone' : ''}
                style={{padding: '0px', justifyContent: 'space-between'}}
            >
                <Checkbox
                    checked={task.isDone}
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
    const addTask = (title: string) => {dispatch(addTaskAC(title, id))}
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