import React,{Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Header from './Header'
import Home from './home/Home'
import Register from './auth/Register.js'
import Footer from './Footer'

class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Header/>
                    <div className='container'>
                        <Route path='/' exact component={Home}/>
                    </div>
                    <div>
                        <Footer/>
                    </div>
                    <Route path='/register' component={Register}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default App