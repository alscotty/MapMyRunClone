import React from 'react'
import ReactDOM from 'react-dom'
import {signup, login, logout} from './util/session_api_util'
import Root from './components/root'
import configureStore from './store/store'


document.addEventListener("DOMContentLoaded",()=>{
    let store;
    
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    //Testing Start
    window.getState=store.getState;
    window.dispatch=store.dispatch;
    window.login=login;
    window.logout=logout;
    //Testing End

    const rootEl=document.getElementById("root");
    ReactDOM.render(<Root store={store}/>,rootEl);
});