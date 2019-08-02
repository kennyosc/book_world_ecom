import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class ProfileNav extends Component{
    render(){
        return(
            <div className="card w-100">
                <div className="card-header">
                    <Link style={{color:'black'}} to='/profile'>
                        <b>Profile</b>
                    </Link>
                </div>
                <ul className="list-group list-group-flush">
                    <Link style={{color:'grey', borderBottom:'1px solid lightgrey'}} to='/editprofile'>
                        <li className="list-group-item">Edit Profile</li>
                    </Link>
                    <Link style={{color:'grey', borderBottom:'1px solid lightgrey'}} to='/changeavatar'>
                        <li className="list-group-item">Change Avatar</li>
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