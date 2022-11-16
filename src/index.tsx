import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import * as serviceWorker from './serviceWorker';
import {createTheme, ThemeProvider} from "@mui/material";
import AppWithReducers from "./AppWithReducers";


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

ReactDOM.render(

    <ThemeProvider theme={theme}>
        <AppWithReducers/>
    </ThemeProvider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
