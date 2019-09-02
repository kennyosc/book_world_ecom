import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import {onAddToCart} from '../../actions/index'

import Header from '../headers/Header.js'
import ProfileNav from './ProfileNav'
import Loader from '../../Loader'
import axios from '../../config/axios.js';


class Wishlist extends Component{

    state={
        wishlist: [],
        unit: 0
    }

    componentDidMount(){
        axios.get(`/userwishlist/${this.props.user.id}`).then(res=>{
            this.setState({wishlist:res.data})
        })
    }

    handleAddToCart = (product_id , product_price) =>{
        const user_id = this.props.user.id
        const first_name = this.props.user.first_name
        const last_name = this.props.user.last_name
        const price = parseInt(product_price)
        const phone_number = this.props.user.phone_number

        const quantity = parseInt(this.state.unit)
        const sub_total = quantity * price

        onAddToCart(user_id,first_name,last_name,phone_number,product_id,quantity,sub_total)
    }

    renderWishlist=()=>{
        if(this.state.wishlist.length === 0){
            return(
                <tr>
                    <td colspan='8' className='text-center'>
                        <p>You have no wishlisted Books</p>
                        <p>
                            <Link to='/allproduct'>
                                See all our products
                            </Link>
                        </p>
                    </td>
                </tr>
            )
        }else{
            return this.state.wishlist.map(val=>{
                return(
                    <tr>
                        <td className='w-25'><img className="img-thumbnail w-75 mx-auto d-block" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt={val.name}/></td>
                        <td className='w-50'>
                            <Link to={`/productdetails/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                                <p><b>Title: </b>{val.name}</p>
                            </Link>
                            <p><b>Price: </b>Rp{val.price.toLocaleString('IN')},00</p>
                            <p><b>Stock: </b>{val.stock}</p>
                            <p><b>Author: </b>{val.author}</p>
                            <p><b>Published: </b>{val.published}</p>
                        </td>
                        <td>
                            <input onChange={(event)=>this.setState({unit: event.target.value})} className='form-control mb-2' placeholder='Insert Quantity'/>
                            <button onClick={()=>this.handleAddToCart(val.id, val.price)} className='btn btn-primary btn-sm'>Add To Cart</button>
                        </td>
                    </tr>
                )
            })
        }
    }

    render(){
        console.log(this.state.unit)
        if(this.props.user.id === ''){
            return(
                <Redirect to ='/'/>
            )
        }else{
                return(
                    <div>
                    <Header/>
                        <div className='container'>
                            <div className="row my-4">
                                <div className="col-sm-12 col-lg-2 position-sticky">
                                    {/* PROFILE PAGES */}
                                    <ProfileNav/>
                                </div>
                                <div style={{fontSize:'0.8em'}} class="card col-sm-12 col-md-10">
                                    <div class="card-body">
                                        <table class="table table-hover">
                                            <tbody>
                                                <tr className='text-center'>
                                                    <th colSpan='3'>Wishlist</th>
                                                </tr>
                                                {this.renderWishlist()}
                                            </tbody>
                                        </table>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps)(Wishlist)