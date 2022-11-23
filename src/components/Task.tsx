import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {HighlightOff} from "@mui/icons-material";
import {TaskType} from "./Todolist/Todolist";
import {changeStatusAC, changeTitleAC, RemoveTasksAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";

export type TaskPropsType = {
    task: TaskType
    todolistID: string
}

export const Task = memo(({task, todolistID}: TaskPropsType) => {
    console.log('task')
    const dispatch = useDispatch()

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = event.currentTarget.checked
        dispatch(changeStatusAC(task.id, newIsDone, todolistID))
    }
    const onClickHandler = () => dispatch(RemoveTasksAC(task.id, todolistID))
    const changeTaskTitle = (title: string) => {
        dispatch(changeTitleAC(task.id, title, todolistID))
    }

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


            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton size={'small'} onClick={onClickHandler}><HighlightOff/></IconButton>
        </ListItem>)
},)

