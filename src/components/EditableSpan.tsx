import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title:string
    changeTitle:(newTitle:string)=>void
}

export const EditableSpan = (props:EditableSpanPropsType) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onEditMode = ( ) => {
        setIsEditMode(true)
    }
    const offEditMode = ( ) => {
        setIsEditMode(false)
        props.changeTitle(title)
    }
    const offEditEnterMode = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter'){
            setIsEditMode(false)
            props.changeTitle(title)
        }
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        isEditMode

        ? <TextField
                value={title}
                autoFocus
                onKeyUp={offEditEnterMode}
                onBlur={offEditMode}
                onChange={onChangeInputHandler}
            />

        : <span onDoubleClick={onEditMode}> {props.title}</span>
    );
};

