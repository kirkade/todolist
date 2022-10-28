import React, {ChangeEvent, useState} from 'react';
import styles from "../Todolist/Todolist.module.css";
import {IconButton, TextField} from "@mui/material";
import {AddBoxOutlined} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean | undefined | string>(undefined)
    const trimmedTitle = title.trim()

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(true)
        setTitle(event.currentTarget.value)
    }
    const onKeyUpInputHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        setError(undefined)
        if (trimmedTitle !== '') {
            if (event.key === 'Enter') {
                props.addItem(trimmedTitle)
                setTitle('')
            }
        } else {
            setError(true)
        }
    }
    const onClickAddItemHandler = () => {
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={onChangeInputHandler}
                onKeyUp={onKeyUpInputHandler}
                label={'Title'}
                // error={'error'}
            />

            <IconButton onClick={onClickAddItemHandler}>
                <AddBoxOutlined color={'primary'}/>
            </IconButton>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

