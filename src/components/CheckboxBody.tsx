import React, {ChangeEvent} from 'react';

type PropsType = {
    checked:boolean,
    callback:(isDone:boolean)=>void
}

export const CheckboxBody = (props:PropsType) => {

    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }

    return (
            <input type="checkbox" checked={props.checked} onChange={onChangeHandler}/>
    );
};
