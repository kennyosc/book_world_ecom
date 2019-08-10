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
import ManageProducts from './admin/manageproducts/ManageProducts.js'
import ManageCategories from './admin/manageproducts/ManageCategories.js'
import AddProduct from './admin/manageproducts/AddProduct.js'
import EditProduct from './admin/manageproducts/EditProduct.js'
import ManagePeople from './admin/people/ManagePeople.js'
import ManageAdmin from './admin/people/ManageAdmin.js'

import Cart from './cart/Cart'
import ProductDetails from './allproducts/ProductDetails'

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
                        <Route path='/cart/:user_id' component={Cart}/>
                        <Route path='/productdetails/:product_id' component={ProductDetails}/>
                </div>
                <div>
                        <Route path='/login-admin' component={LoginAdmin}/>
                        <Route path='/admin' exact component={Admin}/>
                        <Route path='/admin/manageproducts' component={ManageProducts}/>
                        <Route path='/admin/managecategories' component={ManageCategories}/>
                        <Route path='/admin/addproduct' component={AddProduct}/>
                        <Route path='/admin/editproduct/:product_id' component={EditProduct}/>
                        <Route path='/admin/managepeople' component={ManagePeople}/>
                        <Route path='/admin/manageadmin' component={ManageAdmin}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null,{keepLogin})(App)