import React,{Component} from 'react'
import '../styles.css'

class Footer extends Component{
    render(){
        return(
                <div className='row bg-dark justify-content-md-center mr-0 mt-5 p-4'>
                    <div className="aboutUs col-6 mt-4">
                        <h2><i className="fas fa-bookmark"></i> Book World</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    </div>
                    <div className="getHelp col-2 mt-4">
                        <ul>
                            <h2>Get Help</h2>
                            <li><a href="">Lorem Ipsum</a></li>
                            <li><a href="">Lorem Ipsum</a></li>
                            <li><a href="">Lorem Ipsum</a></li>
                        </ul>
                    </div>
                    <div className="link col-2 mt-4">
                        <ul>
                            <h2>Link</h2>
                            <li><a href="">Home</a></li>
                            <li><a href="">About</a></li>
                            <li><a href="">Books</a></li>
                            <li><a href="">Category</a></li>
                            <li><a href="">Contact Us</a></li>
                        </ul>                    
                    </div>
                </div>
        )
    }
}

export default Footer