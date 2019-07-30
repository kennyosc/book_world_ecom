import React,{Component} from 'react'

import background_image from '../../images/background/login_background.jpg'
import Footer from '../Footer'

// SETTING UP BACKGROUND IMAGE
const background_style={
    backgroundImage:`linear-gradient(rgba(0,0,0,0.03),rgba(0,0,0,0.03)),url(${background_image})`,
    backgroundSize:'cover',
    minHeight:'100%',
    minWidth: '1024px',
    width:'100%',
    height: 'auto',
    position: "fixed"
}

class Register extends Component{

    componentDidMount(){
        window.scrollTo(0,0)
    }

    render(){
        return(

            //REGISTER CARD
            <div style={background_style} >
                <div className="card w-50" style={{height:'500px', margin:'50px 0 250px 100px',borderRadius:"15px"}}>
                    <h3 className="card-header">Login</h3>
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
                        <button className='btn btn-primary mt-3' onClick={this.onButtonClick}>Login</button>
                    </div>
                </div>
                <div className='mt-5'>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Register