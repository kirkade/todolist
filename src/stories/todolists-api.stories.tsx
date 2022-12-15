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
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const taskId = 'dcb66506-e13b-43cd-8d6e-a46730b5917c'
        const todolistId = '94dc704f-685e-4a02-8581-0b299c64e5da'

        const title = 'SUPER NEW TASK TITLE'
        const description = 'Task description'
        const completed = false
        const status = 0
        const priority = 1
        const startDate = new Date
        const deadline = new Date

        todolistAPI.updateTask(todolistId,taskId,{
            title,
            description,
            completed,
            status,
            priority,
            startDate,
            deadline
        })
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const taskId = 'b3c52d97-1923-4a19-9268-11711f635bd7'
        const todolistId = '94dc704f-685e-4a02-8581-0b299c64e5da'
        todolistAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export type ModelType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: Date,
    deadline: Date
}