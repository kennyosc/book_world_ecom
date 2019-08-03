import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutButton} from '../../actions/index.js'
import Swal from 'sweetalert2'


class Header extends Component{

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
    
    render(){

        if(this.props.user.username === ''){
            return(
                // NAVBAR BEFORE LOGIN
                <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
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
                        <Link to='/login'>
                            <button className='btn btn-outline-light'>Login</button>
                        </Link>
                        <Link to='/register'>
                            <button className='btn btn-outline-light mx-3'>Register</button>
                        </Link>
    
                        {/* NAVBAR SEARCH */}
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Find Books" aria-label="Search"/>
                        </form>
                            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                    </div>
                </nav>
            )
        }else{
            return(
                // NAVBAR AFTER LOGIN
                <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
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

                        
    
                        {/* NAVBAR SEARCH */}
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Find Books" aria-label="Search"/>
                        </form>
                            <button className="btn btn-outline-light my-1 mx-2 my-sm-0" type="submit">Search</button>
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

export default connect(mapStateToProps, {logoutButton})(Header)