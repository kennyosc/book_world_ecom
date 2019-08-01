import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import ProfileNav from './ProfileNav'

class Profile extends Component{
    render(){
        return(
            <div className='container'>
                <div className="row my-4">
                    <div className="col-sm-12 col-lg-3 position-sticky">
                        {/* PROFILE PAGES */}
                        <ProfileNav/>
                    </div>
                    <div class="card col-sm-12 col-md-6 col-lg-7">
                        <div class="card-body">
                            <img src={this.props.user.avatar} alt="Please choose your avatar" key={new Date()} />
                                <h2>{this.props.user.first_name.concat(' ' + this.props.user.last_name)}</h2>
                                <h5 style={{color:'lightgrey', borderBottom:'1px solid lightgrey', paddingBottom:'20px'}}>{this.props.user.username}</h5>

                                <p className='my-3'><b>Email:</b> {this.props.user.email}</p>
                                <p><b>Phone Number:</b> {this.props.user.phone_number}</p>
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

export default connect(mapStateToProps)(Profile)