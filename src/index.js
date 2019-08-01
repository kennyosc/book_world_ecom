import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Thunk from 'redux-thunk'
import Logger from 'redux-logger'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import App from './components/App'
import Reducers from './reducers/index.js'


const STORE = createStore(Reducers, applyMiddleware(Thunk, Logger))

ReactDOM.render(
    <Provider store = {STORE}>
        <App/>
    </Provider>
    , document.getElementById('root'))