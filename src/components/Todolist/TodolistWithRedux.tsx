import React, {FC, memo, useCallback} from "react";
import styles from './Todolist.module.css'
import {TodoListType} from "../../App";

import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton, List,  Typography} from "@mui/material";
import {Delete,} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTaskAC,} from "../../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, RemoveTodolistAC} from "../../state/todolists-reducer";
import {Task} from "../Task";

export type TodoListTypeWithReduxPropsType = {
    todolist: TodoListType
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export const TodolistWithRedux: FC<TodoListTypeWithReduxPropsType> = memo(({todolist}) => {
    const {id, title, filter} = todolist
    console.log('Todolist')

    let tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[id])
    const dispatch = useDispatch()

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const tasksMap = tasks.map(task => <Task task={task} key={task.id} todolistID={id}/>
    )

    const onAllClickHandler = () => {
        dispatch(changeTodolistFilterAC('all', id))
    }
    const onActiveClickHandler = () => {
        dispatch(changeTodolistFilterAC('active', id))
    }
    const onCompletedClickHandler = () => {
        dispatch(changeTodolistFilterAC('completed', id))
    }

    const removeTodolist = () => {
        dispatch(RemoveTodolistAC(id))
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id))
    }, [title, id])
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(title, id))
    }

    return (
        <div className={styles.todoBlock}>
            <Typography variant={"h5"} align={'center'} fontWeight={'bold'} color={'primary'}
                        style={{marginBottom: '20px'}}>

                <EditableSpan title={title} changeTitle={changeTodolistTitle}/>
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

})