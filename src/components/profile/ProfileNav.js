import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class ProfileNav extends Component{
    render(){
        return(
            <div className="card w-75">
                <div className="card-header">
                    <b>Profile</b>
                </div>
                <ul className="list-group list-group-flush">
                    <Link style={{color:'grey', borderBottom:'1px solid lightgrey'}} to='/editprofile'>
                        <li className="list-group-item">Edit Profile</li>
                    </Link>
                    <Link style={{color:'grey', borderBottom:'1px solid lightgrey'}} to='/changepassword'>
                        <li className="list-group-item">Change Password</li>
                    </Link>
                    <Link style={{color:'grey'}} to={`/profile/${this.props.user.id}/orders`}>
                        <li className="list-group-item">Orders</li>                                                
                    </Link>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps)(ProfileNav)