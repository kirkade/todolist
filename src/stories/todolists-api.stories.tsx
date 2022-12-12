import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('hehehe')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = 'f758bf2c-a3e7-4808-8b3f-165a68be5fa4'
        todolistAPI.deleteTodolist(id)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Hohoho'
        const id = '94dc704f-685e-4a02-8581-0b299c64e5da'
        todolistAPI.updateTodolist(id, title).then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '94dc704f-685e-4a02-8581-0b299c64e5da'
        todolistAPI.getTasks(id)
            .then((res) => {
                setState(res.data)
            })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '94dc704f-685e-4a02-8581-0b299c64e5da'
        const title = 'Title New Task'
        todolistAPI.createTask(id, title)
            .then((res) => {
                    setState(res.data)
                }
            )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'SUPER NEW TASK TITLE'
        const taskId = '874023ea-8290-498b-9a19-8c573ff9dbe8'
        const todolistId = '94dc704f-685e-4a02-8581-0b299c64e5da'
        todolistAPI.updateTaskTitle(todolistId,title,taskId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const taskId = '874023ea-8290-498b-9a19-8c573ff9dbe8'
        const todolistId = '94dc704f-685e-4a02-8581-0b299c64e5da'
        todolistAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

