import React, {useState} from 'react';
import styles from "../Todolist.module.css";

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

export const AddItemForm = (props:AddItemFormPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const trimmedTitle = title.trim()

    const onChangeInputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        error && setError('You need to have letters in task')
        setTitle(event.currentTarget.value)
    }
    const onKeyUpInputHandler = (event: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (trimmedTitle !== '') {
            if (event.key === 'Enter') {
                props.addItem(trimmedTitle)
                setTitle('')
            }
        } else {
            setError('You need to have letters in task')
        }
    }
    const onClickAddItemHandler = () => {
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle)
            setTitle('')
        } else {
            setError('You need to have letters in task')
        }
    }

    return (
        <div>
            <div>
                <input
                    className={error ? styles.error : ''}
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyUp={onKeyUpInputHandler}
                />

                <button
                    onClick={onClickAddItemHandler}>
                    +
                </button>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        </div>
    );
};

