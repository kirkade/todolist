import React from 'react';
import {EditableSpan} from "./EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'components/Editable Span',
    component: EditableSpan,
    argTypes: {
        onChange: {
            description: 'Button inside form clicked'
        }
    }
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    title: 'Some title',
    onChange: action('text was changed')
}
