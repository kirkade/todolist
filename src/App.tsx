import React, {useState} from 'react';
import './App.css'
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValueType = 'all' | 'active' | 'completed'

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValueType,
}

type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}



function App() {
    //BLL:
    const todolistId_1 = v1()
    const todolistId_2 = v1()
    const [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
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
        const copyTasks = {...tasks}
        copyTasks[todolistId] = copyTasks[todolistId].filter(el => el.id != taskID)
        setTasks(copyTasks)

        // setTasks({...tasks, [todolistId]:tasks[todolistId].filter(el => el.id != taskID)})

    }
    //C:
    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: false};

        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId], task]
        })
    }
    //U:
    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {

        // 1st variation
        // setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone: isDone} : t)

        })

        //2nd variation
        // let task = tasks.find(t => t.id === id);
        // if (task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }
    }
    //U:
    const changeTaskTitle = (id: string, title: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === id
                ? {...t, title: title}
                : t)
        })
    }

    //U:
    const changeTodolistFilter = (filter: FilterValueType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
    }
    //U:
    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: title} : tl))
    }
    //D:
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
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
        let newTodolistId: string = v1()
        let newTodolist: TodoListsType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
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

export default App;
