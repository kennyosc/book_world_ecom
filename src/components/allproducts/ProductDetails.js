import React,{Component} from 'react'
import axios from '../../config/axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Header from '../headers/Header.js'
import Loader from '../../Loader'

class ProductDetails extends Component{

    state={
        product:'',
        wishlist:''
    }

    componentDidMount(){
        var product_id = this.props.match.params.product_id

        axios.get('/productdetails/'+product_id).then(res=>{
            this.setState({product:res.data})
        })

        axios.get(`/productwishlist/${this.props.user.id}/${product_id}`).then(res=>{
            this.setState({wishlist:res.data})
        })
    }

    renderAll = () =>{
        var product_id = this.props.match.params.product_id

        axios.get('/productdetails/'+product_id).then(res=>{
            this.setState({product:res.data})
        })

        axios.get(`/productwishlist/${this.props.user.id}/${product_id}`).then(res=>{
            this.setState({wishlist:res.data})
        })
    }

    handleAddToCart = () =>{
        
    }

    handleAddToWishlist = () =>{
        const user_id = this.props.user.id
        const product_id = this.props.match.params.product_id

        axios.post('/addwishlist',{user_id,product_id}).then(res=>{
            this.renderAll()
            console.log(res)
        })
    }

    handleRemoveFromWishlist = () =>{
        const user_id = this.props.user.id
        const product_id = this.props.match.params.product_id

        axios.delete(`/deletewishlist/${user_id}/${product_id}`).then(res=>{
            this.renderAll()
            console.log(res)
        })
    }

    renderButton = () =>{
        if(this.props.user.id === '' && this.state.wishlist === ''){
            return(
                <Link to='/login'>
                    <button className='btn btn-outline-danger mr-1'>Add to Cart</button>
                    <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
                </Link>
            )
        }else if(this.state.wishlist === ''){
            return(
                <div>
                    <button onClick={this.handleAddToCart}className='btn btn-outline-danger mr-1'>Add to Cart</button>
                    <button onClick={this.handleAddToWishlist}className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
                </div>   
            )
        }else if(this.state.wishlist !== ''){
            return(
                <div>
                    <button onClick={this.handleAddToCart}className='btn btn-outline-danger mr-1'>Add to Cart</button>
                    <button onClick={this.handleRemoveFromWishlist}className='btn btn-danger'><i className="far fa-heart"></i></button>
                </div>   
            )
        }
    }

    render(){
        const product = this.state.product
        console.log(this.state.wishlist)
        
        if(this.state.product === '' && this.state.wishlist === ''){
            return(
                <div>
                    <Loader/>
                </div>
            )
        }else{
            return(
                <div>
                     <Header/>
                     <div className='container'>
                         <div className='row my-5'>
                             <div className='col-md-5'>
                                <img className='img-thumbnail' src={`http://localhost:2019/geteditproductimage/${product.photo}`}/>
                             </div>
                             <div className='col ml-0'>
                                 <div className='mb-4'>
                                    <h3>{product.name}</h3>
                                 </div>
    
                                <div className='mb-4'>
                                    <p>{product.description}</p>
                                </div>
    
                                <div>
                                    <h5 style={{color:'red'}}>Rp {product.price.toLocaleString('IN')},00</h5>
                                    <p><b>Stock: </b>{product.stock}</p>
                                    {this.renderButton()}
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
        user:state.auth
    }
}

export default connect(mapStateToProps)(ProductDetails)