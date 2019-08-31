import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {onAdminLogout} from '../../actions/index.js'
import axios from '../../config/axios.js';

class AdminHeader extends Component{

    state={
        notification: []
    }

    componentDidMount(){
        axios.get(`/adminnotification`).then(res=>{
            this.setState({notification:res.data})
        })
    }

    renderNotif = () =>{
        axios.get(`/adminnotification`).then(res=>{
            this.setState({notification:res.data})
        })
    }

    handleLogout = () =>{
        this.props.onAdminLogout()
    }

    /*
    notification features
    1. info upload payment
    2. product review?
    */

    handleDeleteNotification = (notif_id,user_id)=>{
        axios.delete(`/deletenotification/${user_id}/${notif_id}`).then(res=>{
            console.log(res)
            this.renderNotif()
        })
    }

    handleClearAllNotif = () =>{
        axios.delete(`/deleteallnotification`).then(res=>{
            console.log(res)
            this.renderNotif()
        })
    }

    renderNotifications = () =>{
        if(this.state.notification.length === 0){
            return(
                <li className="list-group-item">No notifications</li>
            )
        }else{
            return this.state.notification.map(val=>{
                return(
                    <tr>
                        <td className='border-top-0'>
                            <button style={{color:'lightgrey'}} className='btn' onClick={()=>this.handleDeleteNotification(val.id,val.user_id)}><i className="fas fa-window-close"></i></button>
                        </td>
                        <td className='border-top-0 border-bottom' style={{fontSize:'0.9em'}}>
                            <p>{val.notification}</p>
                            <p style={{fontSize:'0.8em',color:'grey',marginBottom:'1%'}}>At {val.created_at}</p>
                        </td>
                    </tr>
                )
            })
        }
    }

    renderBellIcon = () =>{
        if(this.state.notification.length === 0){
            return(
                <i style={{color:'grey'}} className="fas fa-bell"></i>
            )
        }else{
            return(
                <i style={{color:'red'}} className="fas fa-bell"></i>
            )
        }
    }

    render(){
        console.log(this.state.notification)
        return(
            // NAVBAR AFTER LOGIN
            <nav className="navbar sticky-top navbar-expand-md navbar-light bg-white">
                <Link to='/admin'>
                    <a className="navbar-brand" href="#">Admin Book World</a>
                </Link>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <Link to='/admin/manageproducts'>
                                <a className="nav-link" href="#">Manage Products</a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/admin/manageorders'>
                                <a className="nav-link" href="#">Manage Orders</a>
                            </Link>
                        </li>
                    
                        <li className="nav-item">
                            <Link to='/admin/managepeople'>
                                <a className="nav-link" href="#">People</a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/admin/managecoupons'>
                                <a className="nav-link" href="#">Coupons</a>
                            </Link>
                        </li>
                    </ul>
                    
                    <ul className ='navbar-nav'>
                        <li className="nav-item mx-2 mt-1">
                            <div className="dropdown dropleft">
                                <button className="btn btn-light btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.renderBellIcon()}
                                </button>
                                <div style={{width:'500px'}} className="dropdown-menu table-responsive" aria-labelledby="dropdownMenuButton">
                                    <h6 className="dropdown-header d-inline">Notifications</h6>
                                    <button onClick={this.handleClearAllNotif}  style={{fontSize:'0.6em'}} className='btn btn-light btn-sm'>Clear All</button>

                                    <table className='table table-hover table-sm mt-3'>
                                        <tbody>
                                            {this.renderNotifications()}  
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Hello @{this.props.admin.username}</a>
                        </li>
                    </ul>
                        <button className='btn btn-outline-danger' onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i></button>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        admin:state.admin_auth,
        user:state.auth
    }
}

export default connect(mapStateToProps,{onAdminLogout})(AdminHeader)