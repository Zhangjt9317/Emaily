import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from "./components/App";

// Dev only axios helpers
import axios from "axios";
window.axios=axios; // temp test code

// dummy store
const store = createStore(
    reducers,
    {},
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.querySelector('#root')
);

console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is ', process.env.NODE_ENV);