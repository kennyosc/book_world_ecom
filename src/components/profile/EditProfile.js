import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header.js'


import ProfileNav from './ProfileNav'
import {onUpdateProfile} from '../../actions/index.js'

class EditProfile extends Component{

    handleProfileUpdate = () =>{
        const id = this.props.user.id
        const firstName = this.firstName.value
        const lastName = this.lastName.value
        const username = this.username.value
        const email = this.email.value
        const gender = this.gender.value
        const phoneNumber = this.phoneNumber.value

        this.props.onUpdateProfile(id,firstName,lastName,username,email,gender,phoneNumber)
    }
 
    render(){

            if(this.props.user.username === ''){
                return(
                    <Redirect to='/'/>
                )
            }else{
                return(
                    <div>
                        <Header/>
                        <div className='container'>
                            <div className="row my-4">
                                <div className="col-sm-12 col-lg-3 position-sticky">
                                    {/*PROFILE NAV*/}
                                    <ProfileNav/>
                                </div>
                                <div class="card col-sm-12 col-md-6 col-lg-7">
                                    <div class="card-body">
            
                                    <h2 className='mb-4'>Edit Profile</h2>
                                <form>
                                    <div className="input-group">
                                        <input type="text" className="form-control" defaultValue={this.props.user.first_name} placeholder='*First Name' ref={(firstName) => {this.firstName = firstName}}/>
                                        <input type="text" className="form-control" defaultValue={this.props.user.last_name} placeholder='Last Name' ref={(lastName) => {this.lastName = lastName}}/>
                                    </div>
            
                                    
                                    <form className='input-group my-3'>
                                        <input className='form-control' placeholder='*Username' defaultValue={this.props.user.username}
                                        ref={(username) => {this.username = username}}></input>
                                    </form>
            
                                    
                                    <form className='input-group'>
                                        <input className='form-control' placeholder='*Email' type="email" defaultValue={this.props.user.email}
                                        ref={(email) => {this.email = email}}></input>
                                    </form>
            
                                    
                                    <form className='input-group my-3'>
                                        <input className='form-control' placeholder='Phone Number' defaultValue={this.props.user.phone_number}
                                        ref={(phoneNumber) => {this.phoneNumber = phoneNumber}}></input>
                                    </form>
                                    
                                    <div class="input-group mb-3">
                                        <select class="custom-select" id="inputGroupSelect01" ref={input => this.gender = input} defaultValue={this.props.user.gender}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </form>
                                    
                                    <button className='btn btn-primary mt-3' onClick={this.handleProfileUpdate}>Update Profile</button>
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

export default connect(mapStateToProps,{onUpdateProfile})(EditProfile)