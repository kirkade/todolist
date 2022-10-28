import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Editable Span',
    component: EditableSpan,
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

const onChangeTitle = action('text was changed')
export const Primary = Template.bind({})
Primary.args = {
    title: 'Some title',
    changeTitle: onChangeTitle
}
export const Secondary = Template.bind({})
Secondary.args = {
    title: 'Some title Secondary',
    changeTitle: onChangeTitle
}