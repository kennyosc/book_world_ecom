import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class Header extends Component{

    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    
    
    render(){
        return(
            // NAVBAR
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
                            <Link to='/register'>
                                <a className="nav-link" href="#">Products</a>
                            </Link>
                        </li>
                    
                    </ul>

                    {/* MODAL FOR LOGIN */}
                    <div>
                        <Button className='btn btn-outline-light mx-3' onClick={this.toggle}>{this.props.buttonLabel}Login</Button>

                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} style={{width:'350px',marginTop:'100px'}}>
                            <ModalHeader toggle={this.toggle}><h3>Login</h3></ModalHeader>
                                <ModalBody>
                                    <div className='mb-3'>
                                        <h4>Email</h4>
                                    </div>
                                    <form className='input-group'>
                                        <input className='form-control'
                                        ref={(email) => {this.email = email}}></input>
                                    </form>
        
                                    <div className='my-3'>
                                        <h4>Password</h4>
                                    </div>
                                    <form className='input-group mb-4'>
                                        <input className='form-control' type="password"
                                        ref={(password) => {this.password = password}}></input>
                                    </form>   
                                    <div className='float-right'>
                                        <Button color="primary" onClick={this.toggle}>Login</Button>{' '}
                                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>  
                                    </div>
                                </ModalBody>
                            <ModalFooter className='d-flex justify-content-start'>
                                    <p className='mt-3'>Haven't got an account yet? <Link to="/register" onClick={this.toggle}>Register here</Link></p>
                            </ModalFooter>
                        </Modal>
                    </div>

                    {/* NAVBAR SEARCH */}
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