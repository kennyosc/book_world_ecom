import React,{Component} from 'react'

import background_image from '../../images/background/login_background.jpg'
import Footer from '../Footer'

// SETTING UP BACKGROUND IMAGE
const background_style={
    backgroundImage:`linear-gradient(rgba(0,0,0,0.03),rgba(0,0,0,0.03)),url(${background_image})`,
    backgroundSize:'cover',
    position: "absolute"
}

class Register extends Component{

    componentDidMount(){
        window.scrollTo(0,0)
    }

    render(){
        return(

            //REGISTER CARD
            <div style={background_style} >
                <div className="card w-50" style={{height:'350px', margin:'60px auto 300px auto',borderRadius:"15px"}}>
                    <h3 className="card-header">Login</h3>
                    <div className="card-body">

                        <div className='card-title'>
                            <h4>Email</h4>
                        </div>
                        <form className='input-group'>
                            <input className='form-control' placeholder='Insert Email'
                            ref={(email) => {this.email = email}}></input>
                        </form>

                        <div className='card-title mt-3'>
                            <h4>Password</h4>
                        </div>
                        <form className='input-group'>
                            <input className='form-control' placeholder='Insert Password ' type="password"
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