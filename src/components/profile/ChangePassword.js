import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import ProfileNav from './ProfileNav'
import {onChangePassword} from '../../actions/index.js'
import Header from '../headers/Header.js'


class ChangePassword extends Component{

    handleChangePassword = () =>{
        const password = this.password.value
        const passwordConfirmation = this.passwordConfirmation.value
        const newPasswordConfirmation = this.newPasswordConfirmation.value
        const id = this.props.user.id

        this.props.onChangePassword(id,password,passwordConfirmation,newPasswordConfirmation)
    }

    render(){
            if(this.props.user.username === ''){
                return(
                    <Redirect to=''/>
                )
            }else{
                return(
                    <div>
                        <Header/>
                        <div className='container'>
                            <div className="row my-4">
                                <div className="col-sm-12 col-lg-3 position-sticky">
                                    {/* PROFILE NAV */}
                                    <ProfileNav/>
                                </div>
                                <div class="card col-sm-12 col-md-6 col-lg-7">
                                    <div class="card-body">
            
                                    <h2 className='mb-4'>Change Password</h2>
            
                                    <form className='input-group'>
                                        <input className='form-control' type="password" placeholder='*Old Password'
                                        ref={(password) => {this.password = password}}></input>
                                    </form>
            
                                    <form className='input-group my-3'>
                                        <input className='form-control' type="password" placeholder='*New Password'
                                        ref={(input) => {this.passwordConfirmation = input}}></input>
                                    </form>

                                    <form className='input-group my-3'>
                                        <input className='form-control' type="password" placeholder='*New Password Confirmation'
                                        ref={(input) => {this.newPasswordConfirmation = input}}></input>
                                    </form>
                                    
                                    <button className='btn btn-primary mt-3' onClick={this.handleChangePassword}>Change Password</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps,{onChangePassword})(ChangePassword)