import React, {useReducer} from 'react';
import './App.css'
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTitleAC, RemoveTasksAC, tasksReducer} from "./store/tasks-reducer";


export type FilterValueType = 'all' | 'active' | 'completed'


function AppWithReducers() {
    //BLL:
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])
    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'REACT', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'CSS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Water', isDone: true},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Toilet paper', isDone: false},
            {id: v1(), title: 'Buckwheat', isDone: false},
            {id: v1(), title: 'Meet', isDone: false},
        ]
    })

    //D:
    const removeTask = (taskID: string, todolistId: string) => {
        let action = RemoveTasksAC(taskID, todolistId)
        dispatchToTasks(action)
    }
    //C:
    const addTask = (title: string, todolistId: string) => {
        let action = addTaskAC(title,todolistId)
        dispatchToTasks(action)
    }
    //U:
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let action = changeStatusAC(id,isDone,todolistId)
        dispatchToTasks(action)
    }
    //U:
    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        let action = changeTitleAC(id,title,todolistId)
        dispatchToTasks(action)
    }

    //U:
    const changeTodolistFilter = (filter: FilterValueType, todolistId: string) => {
        let action = changeTodolistFilterAC(filter,todolistId)
        dispatchToTodolists(action)
    }
    //U:
    const changeTodolistTitle = (title: string, todolistId: string) => {
        let action = changeTodolistTitleAC(title,todolistId)
        dispatchToTodolists(action)
    }
    //D:
    const removeTodolist = (todolistId: string) => {
        let action = RemoveTodolistAC(todolistId)
        dispatchToTasks(action)
        dispatchToTodolists(action)
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
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    const todolistComponents = todolists.map(tl => {

        return (
            <Grid item>
                <Paper style={{width: '300px', padding: '20px'}}>
                    <Todolist
                        removeTask={removeTask}
                        changeTodolistFilter={changeTodolistFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}

                        tasks={getFiltered(tasks[tl.id], tl.filter)}
                        title={tl.title}
                        filter={tl.filter}
                        todolistId={tl.id}
                        key={tl.id}
                        id={tl.id}
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

export default AppWithReducers;
