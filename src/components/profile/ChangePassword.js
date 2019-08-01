import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import ProfileNav from './ProfileNav'

class ChangePassword extends Component{
    render(){
        return(
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
                            <input className='form-control' type="password" placeholder='*Password'
                            ref={(password) => {this.password = password}}></input>
                        </form>

                        <form className='input-group my-3'>
                            <input className='form-control' type="password" placeholder='*Password Confirmation'
                            ref={(input) => {this.passwordConfirmation = input}}></input>
                        </form>
                        
                        <button className='btn btn-primary mt-3' onClick={this.handleRegister}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps)(ChangePassword)