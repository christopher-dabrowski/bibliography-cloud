import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

// Read URLs injected with Jinja
const clientBaseUrl = document.getElementById('app-url').innerText;
const filesApiUrl = document.getElementById('file-api-url').innerText;
const publicationsApiUrl = document.getElementById('publications-api-url').innerText;

const urls = {
    clientBase: clientBaseUrl,
    filesApi: filesApiUrl,
    publicationsApi: publicationsApiUrl
};


ReactDOM.render(<App urls={urls} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
