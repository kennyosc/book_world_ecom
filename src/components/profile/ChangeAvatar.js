import React, {Component} from 'react'
import ProfileNav from './ProfileNav'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import blank_avatar from '../../images/profile/blank_profile_picture.png'

class ChangeAvatar extends Component{

    handleUpdateAvatar = () =>{
        const formData = new FormData()
        const avatar = this.avatar.files[0]

        formData.append('avatar',avatar)

        this.props.onUpdateAvatar(formData)
    }

    render(){
        if(this.props.user.username === ''){
            return(
                <Redirect to='/'/>
            )
        } else{
            if(this.props.user.avatar === null){
                return(
                    <div className='container'>
                        <div className="row my-4">
                            <div className="col-sm-12 col-lg-3 position-sticky">
                                {/* PROFILE NAV */}
                                <ProfileNav/>
                            </div>
                            <div class="card col-sm-12 col-md-6 col-lg-7">
                                <div class="card-body">
        
                                <h2 className='mb-4'>Change Profile Picture</h2>
        
                                <img className='d-block img-thumbnail w-50 mb-5' src={blank_avatar} alt="Profile Picture" key={new Date()} />
        
                                <form>
                                    <div class="form-group">
                                        <input type="file" class="form-control-file" id="exampleFormControlFile1" ref={input => this.avatar = input}/>
                                    </div>
                                </form>
                                
                                <button className='btn btn-primary' onClick={this.handleUpdateAvatar}>Update Profile Picture</button>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className='container'>
                        <div className="row my-4">
                            <div className="col-sm-12 col-lg-3 position-sticky">
                                {/* PROFILE NAV */}
                                <ProfileNav/>
                            </div>
                            <div class="card col-sm-12 col-md-6 col-lg-7">
                                <div class="card-body">
        
                                <h2 className='mb-4'>Change Profile Picture</h2>
        
                                <img className='d-block img-thumbnail w-50 mb-5' src={this.props.user.avatar} alt="Profile Picture" key={new Date()} />
        
                                <form>
                                    <div class="form-group">
                                        <input type="file" class="form-control-file" id="exampleFormControlFile1" ref={input => this.avatar = input}/>
                                    </div>
                                </form>
                                
                                <button className='btn btn-primary' onClick={this.handleUpdateAvatar}>Update Profile Picture</button>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps)(ChangeAvatar)