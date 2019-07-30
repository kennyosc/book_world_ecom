import React,{Component} from 'react'

import background_image from '../../images/background/register_background.jpg'

// SETTING UP BACKGROUND IMAGE
const background_style={
    backgroundImage:`linear-gradient(rgba(0,0,0,0.03),rgba(0,0,0,0.03)),url(${background_image})`,
    backgroundSize:'cover',
    minHeight:'100%',
    minWidth: '1024px',
    width:'100%',
    height: 'auto',
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-1"
}

class Register extends Component{

    componentDidMount(){
        window.scrollTo(0,0)
    }

    render(){
        return(

            //REGISTER CARD
            <div style={background_style}>
                <div className="card w-50" style={{height:'500px', margin:'100px 0 0 100px',borderRadius:"15px"}}>
                    <h3 className="card-header">Register</h3>
                    <div className="card-body">
                        <div className='card-title'>
                                    <h4>Username</h4>
                                </div>
                                <form className='input-group'>
                                    <input className='form-control'
                                    ref={(username) => {this.username = username}}></input>
                                </form>

                                <div className='card-title'>
                                    <h4>Email</h4>
                                </div>
                                <form className='input-group'>
                                    <input className='form-control'
                                    ref={(email) => {this.email = email}}></input>
                                </form>

                                <div className='card-title'>
                                    <h4>Password</h4>
                                </div>
                                <form className='input-group'>
                                    <input className='form-control' type="password"
                                    ref={(password) => {this.password = password}}></input>
                                </form>
                                <button className='btn btn-success mt-3' onClick={this.onButtonClick}>Register</button>
                        </div>
                </div>
            </div>
        )
    }
}

export default Register