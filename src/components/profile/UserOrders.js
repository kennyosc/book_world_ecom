import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

import Header from '../headers/Header.js'

import ProfileNav from './ProfileNav'
import axios from '../../config/axios.js'
import Loader from '../../Loader'

class Profile extends Component{

    state={
        user_orders:'',
        selectedOrder:'',
        product_review:'',
        addProductReview: 0,
        review:'',
        rating:''
    }

    componentDidMount(){
        axios.get(`/userorders/${this.props.user.id}`).then(res=>{
            console.log(res)
            this.setState({user_orders:res.data})
        })
    }

    renderAll = () =>{
        axios.get(`/userorders/${this.props.user.id}`).then(res=>{
            this.setState({user_orders:res.data})
        })
    }

    handleUploadPaymentProof = (order_id) =>{
        const payment_proof = this.payment_proof.files[0]
        const user_id = this.props.user.id
        const username = this.props.user.username
        const formData = new FormData()
        
        console.log(payment_proof)
        console.log(user_id)
        console.log(order_id)
        formData.append('payment_proof', payment_proof)
        formData.append('order_id',order_id)
        formData.append('user_id',user_id)
        formData.append('username',username)
    
        axios.patch('/uploadpaymentproof', formData).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    handleRatingInput = (event) =>{
        this.setState({rating: event.target.value})
    }

    handleSubmitReview =(order_id,product_id) =>{
        const user_id = this.props.user.id
        const review = this.state.review
        const rating = this.state.rating

        if(rating === '' || review === ''){
            Swal.fire({
                type: 'error',
                title: 'Email verification required',
                text: 'Please insert all fields'
              })
        }else{
            if(review.length < 20){
                Swal.fire({
                    type: 'error',
                    title: 'Email verification required',
                    text: 'Review must be 20 characters long'
                  })
            }else{
                axios.post(`/addproductreview`,{order_id,user_id,product_id,rating_value:rating,review}).then(res=>{
                      if(res.data.affectedRows){
                        Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Review Submitted!',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          axios.get(`/userproductreview/${user_id}/${order_id}`,).then(res2=>{
                                this.setState({product_review:res2.data})
                                this.setState({addProductReview:0})
                            })
                      }else{
                          console.log(res)
                        Swal.fire({
                            type: 'error',
                            title: 'Insert product failed',
                            text: res.data
                          })
                      }
                })
            }
        }
    }

    /*
    1. select all from orders_details where order_id = ...
    2. render all products when button is pressed (modal)
    3. products have inputs where it will insert into product_reviews.review
    */

    //to get product data from order_details
    handleGetProductReview = (order_id) =>{
        const user_id = this.props.user.id

        axios.get(`/userproductreview/${user_id}/${order_id}`,).then(res=>{
            this.setState({product_review:res.data})
        })
    }

    //RENDERING PRODUCT REVIEW (INSIDE THE MODAL)
    renderProductReview = () =>{
        console.log(this.state.product_review)
        if(this.state.product_review.length === 0){
            return(
                <tr className='text-center'>
                    <td>Item unavailable</td>
                </tr>
            )
        }else{
            return this.state.product_review.map(val=>{
                // BOOK REVIEW STEP 1 (WHICH BOOK DO YOU WANT TO REVIEW)
                if(this.state.addProductReview !== val.order_details_id){
                    if(val.review_status === 0){
                        return(
                            <tr className='border-bottom'>
                                <td className='w-25'><img className="img-thumbnail w-50 mx-auto d-block" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt={val.photo}/></td>
                                <td className='w-50 text-left'>
                                    <p><b>Title: </b>{val.name}</p>
                                    <p><b>Price: </b>Rp{val.price.toLocaleString('IN')},00</p>
                                    <p><b>Author: </b>{val.author}</p>
                                    <p><b>Published: </b>{val.published}</p>
                                </td>
                                <td><button className='btn btn-primary btn-sm mt-3' onClick={()=>this.setState({addProductReview:val.order_details_id})}>Add Review</button></td>
                            </tr>
                            )
                    }else{
                        // IF ALREADY REVIEWED, THEN CANNOT REVIEW ANYMORE
                        return(
                            <tr className='border-bottom'>
                                <td className='w-25'><img className="img-thumbnail w-50 mx-auto d-block" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt={val.photo}/></td>
                                <td className='w-50 text-left'>
                                    <p><b>Title: </b>{val.name}</p>
                                    <p><b>Price: </b>Rp{val.price.toLocaleString('IN')},00</p>
                                    <p><b>Author: </b>{val.author}</p>
                                    <p><b>Published: </b>{val.published}</p>
                                </td>
                                <td className='text-left'>Thank you for your review!</td>
                            </tr>
                            )
                    }
                }else{
                    //INPUT TO REVIEW THE BOOK
                    return(
                        <tr className='border-bottom mb-3'>
                            <td className='w-25'><img className="img-thumbnail w-50 mx-auto d-block" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt={val.photo}/></td>
                            <td className='w-50 text-left'>
                                <form>
                                    Review your book: <input onChange={(event)=>{this.setState({review: event.target.value})}} className='form-control mb-3' placeholder='Min. 20 characters'/>
                                    Give your rating: 
                                    <div class="form-check">
                                        <input onChange={this.handleRatingInput} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1"/>
                                        <label class="form-check-label" for="inlineRadio1">1 (Very Bad)</label>
                                    </div>
                                    <div class="form-check ">
                                        <input onChange={this.handleRatingInput} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2"/>
                                        <label class="form-check-label" for="inlineRadio2">2 (Bad)</label>
                                    </div>
                                    <div class="form-check ">
                                        <input onChange={this.handleRatingInput} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3"/>
                                        <label class="form-check-label" for="inlineRadio3">3 (Okay)</label>
                                    </div>
                                    <div class="form-check ">
                                        <input onChange={this.handleRatingInput} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="4"/>
                                        <label class="form-check-label" for="inlineRadio4">4 (Good!)</label>
                                    </div>
                                    <div class="form-check ">
                                        <input onChange={this.handleRatingInput} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="5"/>
                                        <label class="form-check-label" for="inlineRadio5">5 (Very Good!)</label>
                                    </div>
                                </form>
                            </td>
                            <td>
                                <button className='btn btn-success btn-sm mt-3 mr-2' onClick={()=>this.handleSubmitReview(val.order_id, val.product_id)}>Submit</button>
                                <button className='btn btn-danger btn-sm mt-3' onClick={()=>{this.setState({addProductReview:0})}}>Cancel</button>
                            </td>
                        </tr>
                    )
                }
            })
        }
    }

    handleCancelOrder =(order_id) =>{
        const user_id = this.props.user.id
        const username = this.props.user.username

        /*
        (2 route yang berbeda)
        1. update stock dari tiap product id (loop)
        2. update orders.canceled true
        3. delete order_details (loop)
        4. delete used_coupons by order_id

        features effected
        1. stats
        2. manageorders
        3. user orders
        */

        //update stock
       axios.get(`/userproductreview/${user_id}/${order_id}`,).then(res1=>{
           console.log(res1)
            for(var i = 0; i<res1.data.length; i++){
                var product_id = res1.data[i].product_id
                var product_stock = res1.data[i].stock
                var order_quantity = res1.data[i].quantity

                axios.patch(`/cancelorderupdatestock`,{product_stock,order_quantity,product_id}).then(res2=>{
                    console.log(res2)
                })
            }

            //update order details
            for(var j = 0; j<res1.data.length; j++){
                var product_id = res1.data[j].product_id
                axios.patch('/canderorderupdatedetails',{order_id,user_id,product_id}).then(res4=>{
                    console.log(res4)
                })
            }

            //update orders.canceled, delete used_coupons
            axios.patch('/cancelorder',{order_id,user_id,username}).then(res3=>{
                    this.renderAll()
            })
        })
    }

    /*
    1. photo not sent and order_status 0 => payment pending
    2. photo sent and order_status 0 => waiting for payment confirmation
    3. photo sent and order_status 1 => order completed
    */

    renderOrders=()=>{
        if(this.state.user_orders.length !== 0){
            return this.state.user_orders.map((val)=>{
                if(val.canceled === 1){
                    return(
                        <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>#bw_{val.id}</td>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td className='w-25 text-left'>
                                <p>{val.recipient_address}</p>
                                <p>{val.phone_number}</p>
                            </td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%', color:'red'}} className='text-center'>Order Cancelled</td>
                            <td style={{width:'10%', color:'red'}} className='text-center'>Order Cancelled</td>
                        </tr>
                    )
                }else{
                    // UPLOAD PROOF OF PAYMENT 1 (CHANGE STATE)
                if(val.payment_confirmation === null){
                    if(val.id !== this.state.selectedOrder){
                        return(
                            <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>#bw_{val.id}</td>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td className='w-25 text-left'>
                                <p>{val.recipient_address}</p>
                                <p>{val.phone_number}</p>
                            </td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%',color:'red'}} className='text-center'>Payment pending</td>
                            <td className='text-center w-75'>
                                <button style={{fontSize:'0.8em'}} className='btn btn-primary btn-sm mr-2' onClick={()=>this.setState({selectedOrder:val.id})}>Upload</button>
                                <button onClick={()=>this.handleCancelOrder(val.id, val.product_id, val.quantity,val.stock)} style={{fontSize:'0.8em'}} className='btn btn-danger btn-sm'>Cancel Order</button>
                            </td>
                        </tr>
                        )
                    }else{
                    // UPLOAD PROOF OF PAYMENT 2 (HANDLE UPLOAD)
                        return(
                            <tr className='border-bottom text-center'>
                                <td style={{width:'10%'}}>#bw_{val.id}</td>
                                <td style={{width:'10%'}}>{val.created_at}</td>
                                <td style={{width:'13%'}}>{val.order_recipient}</td>
                                <td className='w-25 text-left'>
                                    <p>{val.recipient_address}</p>
                                    <p>{val.phone_number}</p>
                                </td>
                                <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                                <td style={{width:'10%',color:'red'}} className='text-center'>Payment pending</td>
                                <td className='text-center w-75'>
                                    <form>
                                        <div class="form-group">
                                            <input type="file" class="form-control-file" id="exampleFormControlFile1" ref={input => this.payment_proof = input}/>
                                        </div>
                                    </form>
                                    <button style={{fontSize:'0.8em'}} className='btn btn-success btn-sm mr-2' onClick={()=>this.handleUploadPaymentProof(val.id)}>Upload payment</button>
                                    <button style={{fontSize:'0.8em'}} className='btn btn-warning btn-sm' onClick={()=>this.setState({selectedOrder:0})}>Cancel</button>
                                </td>
                            </tr>
                        )
                    }
                    // ALREADY SEND PROOF OF PAYMENT AND WAITING FOR CONFIRMATION
                }else if(val.payment_confirmation !== null && val.order_status === 0){
                    return(
                        <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>#bw_{val.id}</td>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td className='w-25 text-left'>
                                <p>{val.recipient_address}</p>
                                <p>{val.phone_number}</p>
                            </td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%'}} className='text-center'>Waiting for payment confirmation</td>
                            <td style={{width:'10%'}} className='text-center'>Waiting for payment confirmation</td>
                        </tr>
                    )
                    // ORDER IS COMPLETED AND REVIEW BOOKS
                }else if(val.payment_confirmation !== null && val.order_status === 1){
                    return(
                            <tr className='border-bottom'>
                                <td style={{width:'10%'}} className='text-center'>#bw_{val.id}</td>
                                <td style={{width:'10%'}} className='text-center'>{val.created_at}</td>
                                <td style={{width:'13%'}} className='text-center'>{val.order_recipient}</td>
                                <td className='w-25 text-left'>
                                    <p>{val.recipient_address}</p>
                                    <p>{val.phone_number}</p>
                                </td>
                                <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                                <td style={{width:'10%'}} className='text-center'>Order completed</td>
                                <td style={{width:'17%'}} className='text-center'>
                                    <button style={{fontSize:'0.8em'}} onClick={()=>{this.handleGetProductReview(val.id)}} type="button" className="btn btn-success btn-sm text-center" data-toggle="modal" data-target="#prouct_review">
                                        Review Book
                                    </button>
                                {/* LAUNCH MODAL */}
                                    <div class="modal fade" id="prouct_review" tabindex="-1" role="dialog" aria-labelledby="prouct_reviewTitle" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLongTitle">Book Review</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                            <table class="table table-hover">
                                                <tbody>
                                                    {this.renderProductReview()}
                                                </tbody>
                                            </table>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                    )
                }
                }
            })
        }else{
            return(
                <tr className='border-bottom'>
                    <td colspan='8' className='text-center'>Orders are empty</td>
                </tr>
            )
        }
    }

    render(){
        console.log(this.state.rating)
        if(this.props.user.id === ''){
            return(
                <Redirect to ='/'/>
            )
        }else{
            if(this.state.user_orders !== ''){
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
                                                    <th>Order Id</th>
                                                    <th>Date</th>
                                                    <th>Recipient</th>
                                                    <th>Address</th>
                                                    <th>Total</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                {this.renderOrders()}
                                            </tbody>
                                        </table>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <Loader/>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps)(Profile)