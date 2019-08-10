import React,{Component} from 'react'
import axios from '../../config/axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

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
        const product = this.state.product

        const user_id = this.props.user.id
        const first_name = this.props.user.first_name
        const last_name = this.props.user.last_name
        const total = parseInt(product.price)
        const phone_number = this.props.user.phone_number

        const product_id = product.id
        const quantity = parseInt(this.quantity.value)
        const sub_total = quantity * total

        

        axios.post('/handleaddtocart',
            {
                user_id,
                first_name,
                last_name,
                total,
                phone_number,
                product_id,
                quantity,
                sub_total
            }
        ).then(res=>{
            console.log(res)
            this.renderAll()
            if(typeof(res.data) === 'string'){
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: res.data
                  })
            }else{
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Added to cart!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
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

                                    <div className="input-group mb-5 w-25">
                                        <input ref={input=>this.quantity = input} type="number" defaultValue='1' className="form-control" placeholder="Qty"/>
                                    </div>

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