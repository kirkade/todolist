import React, {useEffect} from 'react';
import './App.css'

import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC, fetchTodolistTC} from "./state/todolists-reducer";

import {AppDispatch, useAppSelector} from "./state/store";
import {Todolist} from "./components/Todolist/Todolist";
import {todolistsSelector} from "./state/selectors";
import {TodolistType} from "./api/todolist-api";


function App() {
    const dispatch = AppDispatch()
    const todolists = useAppSelector<Array<TodolistType>>(todolistsSelector)
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    const todolistComponents = todolists.map(tl => {


        return (
            <Grid item key={tl.id}>
                <Paper style={{width: '300px', padding: '20px'}}>
                    <Todolist todolist={tl}/>
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

export default App;
