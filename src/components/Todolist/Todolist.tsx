import React, {ChangeEvent} from "react";
import styles from './Todolist.module.css'
import {FilterValueType} from "../../App";

import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {Delete, HighlightOff} from "@mui/icons-material";

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
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void,
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
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(el.id, title, props.todolistId)
        }

        return (
            <ListItem
                key={el.id}
                className={el.isDone ? 'isDone' : ''}
                style={{padding: '0px', justifyContent: 'space-between'}}
            >
                {/*<CheckboxBody checked={el.isDone} callback={(isDone) => onChangeHandler(el.id, isDone, props.todolistId)}/>*/}
                <Checkbox
                    checked={el.isDone}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler(el.id, event.currentTarget.checked, props.todolistId)}
                />


                <EditableSpan title={el.title} changeTitle={changeTaskTitle}/>
                <IconButton size={'small'} onClick={onClickHandler}><HighlightOff/></IconButton>
            </ListItem>)
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

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }

    return (
        <div className={styles.todoBlock}>
            <Typography variant={"h5"} align={'center'} fontWeight={'bold'} color={'primary'}
                        style={{marginBottom: '20px'}}>

                <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton size={'small'} onClick={removeTodolist}><Delete/></IconButton>

            </Typography>

            <AddItemForm addItem={addTask}/>

            <List>
                {tasksMap}
            </List>

            <div>
                <ButtonGroup disableElevation variant="contained" size={"small"} fullWidth>
                    <Button
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={onActiveClickHandler}>Active
                    </Button>
                    <Button
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )

}