import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {loginButton} from '../../actions/index.js'


class LoginDropdown extends Component{

    handleLogin = (event) =>{
        event.preventDefault()
        const email = this.email.value
        const password = this.password.value
        const remember_me = this.remember_me.checked

        console.log(email)
        console.log(password)
        console.log(remember_me)

        this.props.loginButton(email,password,remember_me)
    }

    render(){
        return(
            <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                </button>
                    <form className="dropdown-menu p-4">
                        <div className="form-group">
                            <label for="exampleDropdownFormEmail2">Email address</label>
                            <input style={{width:'300px'}} ref={input => this.email = input} type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com"/>
                        </div>
                        <div className="form-group">
                            <label for="exampleDropdownFormPassword2">Password</label>
                            <input style={{width:'300px'}} ref={input => this.password = input} type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password"/>
                        </div>
                        <div className="form-check">
                            <input ref={input => this.remember_me = input} type="checkbox" className="form-check-input" id="dropdownCheck2"/>
                            <label className="form-check-label" for="dropdownCheck2">
                                Remember me
                            </label>
                        </div>
                        
                        <button type="submit" className="btn btn-primary mt-3" onClick={this.handleLogin}>Sign in</button>

                        <div class="dropdown-divider"></div>
                            <p className="m-0 p-0" href="#">New around here?  
                            <Link to='/register'>
                             Register Here
                            </Link>
                            </p>
                    </form>
            </div>
        )
    }
}

export default connect(null,{loginButton})(LoginDropdown)