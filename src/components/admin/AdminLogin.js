import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {onAdminLogin} from '../../actions/index.js'

class AdminLogin extends Component{

    handleLogin = () =>{
        const username = this.username.value
        const password = this.password.value

        this.props.onAdminLogin(username,password)
    }

    render(){
        if(this.props.admin.username === ''){
            return(
                //ADMIN LOGIN CARD
                <div>
                <div className="card w-50" style={{height:'350px', margin:'60px auto 300px auto',borderRadius:"15px"}}>
                    <h3 className="card-header">Admin Login</h3>
                    <div className="card-body">
   
                        <div className='card-title'>
                            <h4>Username</h4>
                        </div>
                        <form className='input-group'>
                            <input className='form-control' placeholder='Insert Admin Username'
                            ref={(username) => {this.username = username}}></input>
                        </form>
   
                        <div className='card-title mt-3'>
                            <h4>Password</h4>
                        </div>
                        <form className='input-group'>
                            <input className='form-control' placeholder='Insert Password ' type="password"
                            ref={(password) => {this.password = password}}></input>
                        </form>
                        <button className='btn btn-primary mt-3' onClick={this.handleLogin}>Login</button>
                    </div>
                </div>
            </div>
           )
        }else{
            return(
                <Redirect to ='/admin'/>
            ) 
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        admin : state.admin_auth
    }
}

export default connect(mapStateToProps, {onAdminLogin})(AdminLogin)