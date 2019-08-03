import React,{Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {keepLogin} from '../actions/index.js'
import {connect} from 'react-redux'

import Home from './home/Home'
import Register from './auth/Register.js'
import Login from './auth/Login.js'
import AllProducts from './allproducts/AllProducts.js'
import Profile from './profile/Profile.js'
import EditProfile from './profile/EditProfile.js'
import ChangePassword from './profile/ChangePassword.js'
import ChangeAvatar from './profile/ChangeAvatar.js'

import LoginAdmin from './admin/AdminLogin.js'
import Admin from './admin/Admin.js'

const cookie = new cookies()

class App extends Component{

    componentWillMount(){
        const objCookie = cookie.get('user')
        console.log(objCookie)

        if(objCookie !== undefined){
            this.props.keepLogin(objCookie)
        }
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                        <Route path='/' exact component={Home}/>
                        <Route path='/register' component={Register}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/allproduct' component={AllProducts}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/editprofile' component={EditProfile}/>
                        <Route path='/changepassword' component={ChangePassword}/>
                        <Route path='/changeavatar' component={ChangeAvatar}/>
                </div>
                <div>
                        <Route path='/login-admin' component={LoginAdmin}/>
                        <Route path='/admin' component={Admin}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null,{keepLogin})(App)