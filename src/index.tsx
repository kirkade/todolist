import React from 'react';
import './index.css';
import {createTheme, ThemeProvider} from "@mui/material";
import {Provider} from 'react-redux';
import {store} from "./state/store";
import {createRoot} from "react-dom/client";
import AppWithRedux from "./AppWithRedux";


const theme = createTheme({
    palette: {
        primary: {
            main: '#ff4400',
        },
        secondary: {
            main: '#0044ff'
        },
    },
})
const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppWithRedux/>
        </ThemeProvider>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
