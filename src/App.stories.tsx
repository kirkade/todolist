import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";

export default {
    title: 'components/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => <App />

export const AppWithReduxStory = Template.bind({})


