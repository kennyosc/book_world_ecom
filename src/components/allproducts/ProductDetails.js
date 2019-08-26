import React,{Component} from 'react'
import axios from '../../config/axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Header from '../headers/Header.js'
import Loader from '../../Loader'
import blank_avatar from '../../images/profile/blank_profile_picture.png'
import {onAddToCart, onAddToWishlist,onRemoveFromWishlist} from '../../actions/index.js'

class ProductDetails extends Component{

    state={
        product:'',
        wishlist:'',
        productReview:[],
        product_rating:0
    }

    componentDidMount(){
        var product_id = this.props.match.params.product_id

        axios.get('/productdetails/'+product_id).then(res=>{
            this.setState({product:res.data})
        })

        axios.get(`/productwishlist/${this.props.user.id}/${product_id}`).then(res=>{
            this.setState({wishlist:res.data})
        })

        axios.get(`/productreviews/${product_id}`).then(res=>{
            this.setState({productReview : res.data})
        })

        axios.get(`/averageproductrating/${product_id}`).then(res=>{
            this.setState({product_rating: res.data})
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
        const product = this.state.product

        const user_id = this.props.user.id
        const first_name = this.props.user.first_name
        const last_name = this.props.user.last_name
        const price = parseInt(product.price)
        const phone_number = this.props.user.phone_number

        const product_id = product.id
        const quantity = parseInt(this.quantity.value)
        const sub_total = quantity * price

        console.log(quantity)

        //kalau misalnya mau jalankan function dari actions tanpa menggunakan reducer
        //tidak perlu pakai this.props.onAddToCart dan tidak perlu ke dalam connect
        onAddToCart(user_id,first_name,last_name,phone_number,product_id,quantity,sub_total)
        this.renderAll()
    }

    handleAddToWishlist = () =>{
        const user_id = this.props.user.id
        const product_id = this.props.match.params.product_id

        onAddToWishlist(user_id,product_id)
        this.renderAll()
    }

    handleRemoveFromWishlist = () =>{
        const user_id = this.props.user.id
        const product_id = this.props.match.params.product_id

        onRemoveFromWishlist(user_id,product_id)
        this.renderAll()
    }

    renderButton = () =>{
        if(this.props.user.id === ''){
            return(
                <Link to='/login'>
                    <button className='btn btn-outline-danger mr-1'>Add to Cart</button>
                    <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
                </Link>
            )
        }else if(this.state.wishlist === '' && this.props.user.id !== ''){
            return(
                <div>
                    <button onClick={this.handleAddToCart}className='btn btn-outline-danger mr-1'>Add to Cart</button>
                    <button onClick={this.handleAddToWishlist}className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
                </div>   
            )
        }else if(this.state.wishlist !== '' && this.props.user.id !== ''){
            return(
                <div>
                    <button onClick={this.handleAddToCart}className='btn btn-outline-danger mr-1'>Add to Cart</button>
                    <button onClick={this.handleRemoveFromWishlist}className='btn btn-danger'><i className="far fa-heart"></i></button>
                </div>   
            )
        }
    }

    renderProductReview = () =>{
        if(this.state.productReview.length === 0){
            return(
                <tr className='border-bottom'>
                    <td className='text-center'>There are no reviews</td>
                </tr>
            )
        }else{
            return this.state.productReview.map(val=>{
                if(val.avatar === null){
                    return(
                    <tr className='border-bottom'>
                        <td className='text-center' style={{width:'5%'}}>
                            <img className='img-thumbnail' src={blank_avatar} alt="Profile Picture" />                            
                            <p><b>{val.username}</b></p>
                            
                        </td>
                        <td>
                            <p style={{fontSize:'0.7em'}}>Posted at {val.created_at}</p>
                            <b>{val.rating_value}</b>/5 <i style={{color:'grey'}} class="fas fa-star"></i>
                            <p>"{val.review}"</p>
                        </td>
                    </tr>
                    )
                }else{
                    return(
                        <tr className='border-bottom'>
                            <td className='text-center' style={{width:'5%'}}>
                                <img className='img-thumbnail' src={`http://localhost:2019/profile/avatar/${val.avatar}`} alt="Profile Picture"/>
                                <p><b>{val.username}</b></p>
                                
                            </td>
                            <td>
                                <p style={{fontSize:'0.7em'}}>Posted at {val.created_at}</p>
                                <b>{val.rating_value}</b>/5 <i style={{color:'grey'}} class="fas fa-star"></i>
                                <p>"{val.review}"</p>
                            </td>
                        </tr>
                    )
                }
            })
        }
    }

    renderAvgReviews = () =>{
        if(this.state.productReview.length > 0){
            return(
                <p style={{fontSize:'0.7em'}}>{this.state.product_rating.ratings} <i style={{color:'grey'}} class="fas fa-star"></i> (out of {this.state.productReview.length} reviews)</p>
            )
        }else{
            return(
                <p style={{fontSize:'0.7em'}}>This book have not been reviewed yet</p>
            )
        }
    }

    render(){
        const product = this.state.product
        console.log(this.state.wishlist)
        
        if(this.state.product === ''){
            return(
                <div>
                     <Header/>                    
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
                                    {this.renderAvgReviews()}
                                 </div>
    
                                <div className='mb-4'>
                                    <p>{product.description}</p>
                                </div>
    
                                <div>
                                    <h5 style={{color:'red'}}>Rp {product.price.toLocaleString('IN')},00</h5>
                                    <p><b>Stock: </b>{product.stock}</p>

                                    <div className="input-group mb-5 w-25">
                                        <input ref={input=>this.quantity = input} type="number" defaultValue='1' className="form-control" placeholder="Qty"/>
                                    </div>

                                    {this.renderButton()}
                                </div>
                             </div>
    
                         </div>

                         {/* product reviews */}
                         <div>
                             <h5 className='mb-3'>Book Reviews</h5>
                            <table class="table">
                                <tbody>
                                    {this.renderProductReview()}
                                </tbody>
                            </table>
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