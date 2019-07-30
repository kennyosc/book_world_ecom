import React,{Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Header from './Header'
import Home from './home/Home'
import Register from './auth/Register.js'
import Login from './auth/Login.js'
import Footer from './Footer'

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                        <Route path='/' exact component={Home}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App