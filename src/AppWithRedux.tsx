import React from 'react';
import './App.css'
import {TaskType, Todolist} from "./components/Todolist/Todolist";

import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeStatusAC,
    changeTitleAC,
    RemoveTasksAC,
} from "./state/tasks-reducer";
import {TasksStateType, TodoListType} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./components/Todolist/TodolistWithRedux";


export type FilterValueType = 'all' | 'active' | 'completed'


function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>((state) => state.todolists)

    const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

    const dispatch = useDispatch()

    //D:
    const removeTask = (taskID: string, todolistId: string) => {
        let action = RemoveTasksAC(taskID, todolistId)
        dispatch(action)
    }
    //C:
    const addTask = (title: string, todolistId: string) => {
        let action = addTaskAC(title, todolistId)
        dispatch(action)
    }
    //U:
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let action = changeStatusAC(id, isDone, todolistId)
        dispatch(action)
    }
    //U:
    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        let action = changeTitleAC(id, title, todolistId)
        dispatch(action)
    }

    //U:
    const changeTodolistFilter = (filter: FilterValueType, todolistId: string) => {
        let action = changeTodolistFilterAC(filter, todolistId)
        dispatch(action)
    }
    //U:
    const changeTodolistTitle = (title: string, todolistId: string) => {
        let action = changeTodolistTitleAC(title, todolistId)
        dispatch(action)
    }
    //D:
    const removeTodolist = (todolistId: string) => {
        let action = RemoveTodolistAC(todolistId)
        dispatch(action)

    }
    //U:
    const getFiltered = (t: Array<TaskType>, filter: FilterValueType) => {
        let tasksForTodoList = t

        if (filter === 'active') {
            tasksForTodoList = t.filter(el => !el.isDone)
        }

        if (filter === 'completed') {
            tasksForTodoList = t.filter(el => el.isDone)
        }
        return tasksForTodoList
    }
    //C:
    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)

    }

    const todolistComponents = todolists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper style={{width: '300px', padding: '20px'}}>
                    {/*<Todolist*/}
                    {/*    removeTask={removeTask}*/}
                    {/*    changeTodolistFilter={changeTodolistFilter}*/}
                    {/*    addTask={addTask}*/}
                    {/*    changeStatus={changeStatus}*/}
                    {/*    removeTodolist={removeTodolist}*/}
                    {/*    changeTaskTitle={changeTaskTitle}*/}
                    {/*    changeTodolistTitle={changeTodolistTitle}*/}

                    {/*    tasks={getFiltered(tasks[tl.id], tl.filter)}*/}
                    {/*    title={tl.title}*/}
                    {/*    filter={tl.filter}*/}
                    {/*    todolistId={tl.id}*/}
                    {/*    key={tl.id}*/}
                    {/*    id={tl.id}*/}
                    {/*/>*/}
                    <TodolistWithRedux
                        todolist={tl}
                    />

                </Paper>
            </Grid>
        )
    })

    //GUI
    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolistComponents}
                </Grid>
            </Container>

        </div>
    )
}

export default AppWithRedux;
