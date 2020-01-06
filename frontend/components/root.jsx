import React from 'react';
import { Provider } from 'react-redux';
import {HashRouter} from 'react-router-dom'
import App from './app'

//destructure props in the argument so we can just call store later
const Root = ({ store }) => (
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
);

export default Root;