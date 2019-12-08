import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './NavbarContainer'
import { BrowserRouter as Router } from 'react-router-dom';

window.getComputedStyle(document.body)

export const ACCESS_TOKEN = 'accessToken';
export const API_BASE_URL = 'http://localhost:8099'

export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 40;

export const TITLE_MIN_LENGTH = 2;
export const TITLE_MAX_LENGTH = 40;

export const SURNAME_MIN_LENGTH = 3;
export const SURNAME_MAX_LENGTH = 40;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 5;
export const PASSWORD_MAX_LENGTH = 20;

ReactDOM.render(
    <Router>
        <App />
        
    </Router>, 
    document.getElementById('root')
);

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

