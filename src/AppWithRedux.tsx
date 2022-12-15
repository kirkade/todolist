import React from 'react';
import './App.css'

import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC} from "./state/todolists-reducer";

import {TodoListType} from "./App";
import { useSelector} from "react-redux";
import {AppDispatch, AppRootStateType, useAppSelector} from "./state/store";
import {TodolistWithRedux} from "./components/Todolist/TodolistWithRedux";
import {todolistsSelector} from "./state/selectors";


function AppWithRedux() {

    const todolists = useAppSelector<Array<TodoListType>>(todolistsSelector)
    const dispatch = AppDispatch()

    //C:
    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)

    }

    const todolistComponents = todolists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper style={{width: '300px', padding: '20px'}}>
                    <TodolistWithRedux todolist={tl}/>
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
