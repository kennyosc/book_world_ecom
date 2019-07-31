import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Thunk from 'redux-thunk'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'

import App from './components/App'
import Reducers from './reducers/index.js'


const STORE = createStore(Reducers, applyMiddleware(Thunk))

ReactDOM.render(
    <Provider store = {STORE}>
        <App/>
    </Provider>
    , document.getElementById('root'))