import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

export type EditableSpanPropsType = {
    /**
     * the text of span
     */
    title:string
    /**
     *
     * @param newTitle is the new text of span
     */
    onChange:(newTitle:string)=>void
}

export const EditableSpan = memo((props:EditableSpanPropsType) => {
    console.log('editable span')
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)
    const onEditMode = ( ) => {
        setIsEditMode(true)
    }
    const offEditMode = ( ) => {
        setIsEditMode(false)
        props.onChange(title)
    }
    const offEditEnterMode = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter'){
            setIsEditMode(false)
            props.onChange(title)
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
},)

