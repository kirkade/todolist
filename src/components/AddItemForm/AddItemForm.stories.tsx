import {ComponentMeta, ComponentStory} from "@storybook/react";
import {AddItemForm} from "./AddItemForm";
import React, {ChangeEvent, useState} from "react";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {AddBoxOutlined} from "@mui/icons-material";
import styles from "../Todolist/Todolist.module.css";

export default {
    title: 'components/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Item was added'
        },
    }
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>

export const AddItemFormStory = Template.bind({})
AddItemFormStory.args = {
    addItem: action('Item was added')
}




const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean | undefined>(undefined)
    const trimmedTitle = title.trim()

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(true)
        setTitle(event.currentTarget.value)
    }
    const onKeyUpInputHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        setError(undefined)
        if (trimmedTitle !== '') {
            if (event.key === 'Enter') {
                args.addItem(trimmedTitle)
                setTitle('')
            }
        } else {
            setError(true)
        }
    }
    const onClickAddItemHandler = () => {
        if (trimmedTitle !== '') {
            args.addItem(trimmedTitle)
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
                error={error}
            />

            <IconButton onClick={onClickAddItemHandler}>
                <AddBoxOutlined color={'primary'}/>
            </IconButton>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export const AddItemFormStoryError = TemplateWithError.bind({})
