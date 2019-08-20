import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {onAdminLogout} from '../../actions/index.js'

class AdminHeader extends Component{

    handleLogout = () =>{
        this.props.onAdminLogout()
    }

    render(){
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
                            <Link to='/admin/managepeople'>
                                <a className="nav-link" href="#">People<span className="sr-only">(current)</span></a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/admin/manageproducts'>
                                <a className="nav-link" href="#">Manage Products</a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/admin/orders'>
                                <a className="nav-link" href="#">Manage Orders</a>
                            </Link>
                        </li>
                    
                    </ul>
                    
                    <ul className ='navbar-nav'>
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
        admin:state.admin_auth
    }
}

export default connect(mapStateToProps,{onAdminLogout})(AdminHeader)