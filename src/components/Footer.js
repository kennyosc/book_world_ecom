import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import '../styles.css'

class Footer extends Component{
    render(){
        return(
                <div className='row bg-dark justify-content-md-center mr-0 mt-5 p-4'>
                    <div className="aboutUs col-6 mt-4">
                        <h2><i className="fas fa-bookmark"></i> Book World</h2>
                        <p>Book World - Online Buying and Selling Site in Indonesia
Book World is an online trading site in Indonesia that has millions of books from all around the world. Shopping online is getting easier and more fun nowadays because anything you want can certainly be found on Book World. Search for book that you need, all you can do is just a click.</p>

                    </div>
                    <div className="link col-2 mt-4">
                        <ul>
                            <h2>Link</h2>
                            <li>
                                <Link to='/'>
                                    <a href="">Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link to='/allproduct'>
                                    <a href="">All products</a>
                                </Link>
                            </li>
                        </ul>                    
                    </div>
                </div>
        )
    }
}

export default Footer