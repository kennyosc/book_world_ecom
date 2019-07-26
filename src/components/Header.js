import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component{
    render(){
        return(
            <nav className="navbar sticky-top navbar-expand-md navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Book World</a>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                            <Link>
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/register'>
                                <a className="nav-link" href="#">Products</a>
                            </Link>
                        </li>
                    
                    </ul>

                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Find Books" aria-label="Search"/>
                    </form>
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                </div>
            </nav>
        )
    }
}

export default Header