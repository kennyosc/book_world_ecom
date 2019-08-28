import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutButton} from '../../actions/index.js'
import Swal from 'sweetalert2'

import {loginButton} from '../../actions/index.js'
import LoginDropdown from '../auth/LoginDropdown.js'
import axios from '../../config/axios.js';


class Header extends Component{

    state={
        user_notification:[],
        search:''
    }

    componentDidMount(){
        axios.get(`/usernotifications/${this.props.user.id}`).then(res=>{
            this.setState({user_notification: res.data})
        })
    }

    renderNotif = () =>{
        axios.get(`/usernotifications/${this.props.user.id}`).then(res=>{
            this.setState({user_notification: res.data})
        })
    }

    handleLogout = () =>{
        this.props.logoutButton()
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Logout Success!',
            showConfirmButton: false,
            timer: 1500
          })
    }

    renderSearchButton=()=>{
        var query = this.state.search
        if(!window.location.href.includes('/search')){
            return(
                <Link to={`/search/${query}`}>
                    <button className="btn btn-outline-secondary my-1 mx-2 my-sm-0">Search</button>
                </Link>
            )
        }else{
            return(
                <button onClick={()=>this.props.handleSearch(query)} className="btn btn-outline-secondary my-1 mx-2 my-sm-0">Search</button>
            )
        }
    }

    //NOTIFICATIONS
    handleDeleteNotification = (notif_id)=>{
        const user_id = this.props.user.id
        axios.delete(`/deleteusernotification/${user_id}/${notif_id}`).then(res=>{
            console.log(res)
            this.renderNotif()
        })
    }

    handleClearAllNotif = () =>{
        axios.delete(`/deleteallusernotification/${this.props.user.id}`).then(res=>{
            console.log(res)
            this.renderNotif()
        })
    }

    renderNotifications = () =>{
        if(this.state.user_notification.length === 0){
            return(
                <li className="list-group-item">No notifications</li>
            )
        }else{
            return this.state.user_notification.map(val=>{
                return(
                    <tr>
                        <td className='border-top-0'>
                            <button style={{color:'lightgrey'}} className='btn' onClick={()=>this.handleDeleteNotification(val.id)}><i className="fas fa-window-close"></i></button>
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
        if(this.state.user_notification.length === 0){
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
        console.log(this.state.search)

        if(this.props.user.username === ''){
            return(
                // NAVBAR BEFORE LOGIN
                <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light border-bottom">
                    <Link to='/'>
                        <a className="navbar-brand" href="#">Book World</a>
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
    
                            <li className="nav-item">
                                <Link to='/'>
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </Link>
                            </li>
    
                            <li className="nav-item">
                                <Link to='/allproduct'>
                                    <a className="nav-link" href="#">Products</a>
                                </Link>
                            </li>
                        
                        </ul>
                        
                        {/* LOGIN DROPDOWN BUTTON */}
                        <LoginDropdown/>

                        <Link to='/register'>
                            <button className='btn btn-success mx-3 btn-sm'>Register</button>
                        </Link>
    
                        {/* NAVBAR SEARCH */}
                        <form className="form-inline my-2 my-lg-0">
                            <input onChange={(input)=>this.setState({search:input.target.value})} className="form-control mr-sm-2" type="search" placeholder="Find Books" aria-label="Search"/>
                        </form>
                        {this.renderSearchButton()}
                        
                    </div>
                </nav>
            )
        }else{
            return(
                // NAVBAR AFTER LOGIN
                <nav className="navbar sticky-top navbar-expand-md navbar-light bg-light border-bottom">
                    <Link to='/'>
                        <a className="navbar-brand" href="#">Book World</a>
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
    
                            <li className="nav-item">
                                <Link to='/'>
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </Link>
                            </li>
    
                            <li className="nav-item">
                                <Link to='/allproduct'>
                                    <a className="nav-link" href="#">Products</a>
                                </Link>
                            </li>
                        
                        </ul>
                        
                        <ul className ='navbar-nav mr-auto'>
                            <li className="nav-item">
                                <Link to='/profile'>
                                    <a className="nav-link" href="#">Hello {this.props.user.username}</a>
                                </Link>
                            </li>
                        </ul>

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

                        {/* GO TO MY CART */}
                        <Link className='mx-3' style={{fontSize:'1.2em', color:'grey'}} to={`/cart`}>
                            <i class="fas fa-shopping-cart"></i>
                        </Link>
                        

                        {/* NAVBAR SEARCH */}
                        <form className="form-inline my-2 my-lg-0">
                            <input onChange={(input)=>this.setState({search:input.target.value})} className="form-control mr-sm-2" type="search" placeholder="Find Books" aria-label="Search"/>
                        </form>
                        {this.renderSearchButton()}
                            <button className='btn btn-outline-danger' onClick={this.handleLogout}><i class="fas fa-sign-out-alt"></i></button>
                    </div>
                </nav>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps, {logoutButton, loginButton})(Header)