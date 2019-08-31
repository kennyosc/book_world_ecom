import React,{Component} from 'react'
import {Redirect,Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header'
import axios from '../../config/axios'
import Loader from '../../Loader'
import AddressInput from './AddressInput'
import Swal from 'sweetalert2'

import {deleteFromCart, addCoupon, removeCoupon} from '../../actions/index'
import AllUserAddress from './AllUserAddress';

class Cart extends Component{

    state={
        cart:'',
        totalOrder: '',
        coupon_value:0,
        coupon_id:'',
        use_coupon: false,
        main_address:'',
        shipping_cost:0,
        orderCompleted:0,
        address_list:[]
    }

    componentDidMount(){
        const user_id = this.props.user.id

        //get cart by user_id
        axios.get(`/getusercart/${user_id}`).then(res=>{
            console.log(res)
            this.setState({cart:res.data})
        })

        //get total by user id where order_id is null
        axios.get(`/gettotalorder/${user_id}`).then(res=>{
            console.log(res)
            if(res.data.SUM === null){
                this.setState({totalOrder:0})
            }else{
                // kalau pake sql method sum, itu hasilnya bukan sebuah array. tapi sebuah object
                this.setState({totalOrder:res.data.SUM})
            }
        })

        //get if user have used coupons or not
        axios.post('/getcouponvalue',{user_id}).then(res=>{
            if(res.data !== ''){
                this.setState({coupon_value:res.data.coupon_value,coupon_id:res.data.coupon_id, use_coupon:true})
            }else{
                this.setState({coupon_value:0,coupon_id:''})
            }
        })

        //get user main address
        axios.get(`/getuseraddress/${user_id}`).then(res=>{
            this.setState({main_address:res.data})
        })

        //get shipping value based on user_address main
        axios.get(`/shippingvalue/${user_id}`).then(res=>{
            if(res.data !== ''){
                this.setState({shipping_cost:res.data})
            }
        })
    }

    renderAll = () =>{
        const user_id = this.props.user.id

        axios.get(`/getusercart/${user_id}`).then(res=>{
            this.setState({cart:res.data})
        })

        axios.get(`/gettotalorder/${user_id}`).then(res=>{
            console.log(res)
            if(res.data.SUM === null){
                this.setState({totalOrder:0})
            }else{
                this.setState({totalOrder:res.data.SUM})
            }
        })

        axios.post('/getcouponvalue',{user_id}).then(res=>{
            if(res.data !== ''){
                this.setState({coupon_value:res.data.coupon_value,coupon_id:res.data.coupon_id})
            }else{
                this.setState({coupon_value:0,coupon_id:''})
            }
        })

        //get user main address
        axios.get(`/getuseraddress/${user_id}`).then(res=>{
            this.setState({main_address:res.data})
        })

        //get shipping value based on user_address main
        axios.get(`/shippingvalue/${user_id}`).then(res=>{
            if(res.data !== ''){
                this.setState({shipping_cost:res.data})
            }
        })
    }

    handleAddCoupon = async() =>{
        const coupon_code = this.coupon.value
        const user_id = this.props.user.id
        
        if(coupon_code === ''){
            Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Please insert coupon'
                  })
        }else{
            const data = await addCoupon(user_id,coupon_code)

            //dari action di return ke depan, karena mau melanjutkan hasil return tsb dengan function lainn
            if(data.affectedRows){
                console.log(data)
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Coupon added',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    this.setState({use_coupon:true})
                    this.renderAll()
            }else{
                console.log(data)
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: data
                      })
            }
        }
    }

    handleRemoveCoupon = async() =>{
        const user_id = this.props.user.id
        const coupon_id = this.state.coupon_id

        const data = await removeCoupon(user_id,coupon_id)

        if(data.affectedRows){
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Coupon removed',
                showConfirmButton: false,
                timer: 1500
            })
            this.setState({use_coupon:false})
            this.renderAll()
        }else{
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Coupon not deleted'
              })
        }
    }

    // ===============RENDERING================

    renderCart = () =>{
        if(this.state.cart.length !== 0){
            var hasil = this.state.cart.map(val=>{
                return(
                    <tr className='border-bottom'>
                        <td className='w-25'><img className="img-thumbnail w-50 mx-auto d-block" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt="Card image cap"/></td>
                        <td className='w-50'>{val.name}</td>
                        <td className='w-25 text-center'><b>Qty: </b>{val.quantity}</td>
                        <td style={{fontSize:'0.7em'}} className='text-center'><b>Rp{val.sub_total.toLocaleString('IN')},00</b></td>
                    </tr>
                )
            })
            return hasil
        }else{
            return(
                <tr className='border-bottom'>
                    <td className='text-center'>Your cart is Empty</td>
                </tr>
            )
        }
    }

    renderShippingCost = () =>{
        const shipping_cost = this.state.shipping_cost.shipping_cost

        if(!shipping_cost){
            return(
                <div></div>
            )
        }else{
            return(
                <div className='pb-3 mb-3 border-bottom'>
                    Shipping: <p className="card-text"><b>Rp {shipping_cost.toLocaleString('IN')},00</b></p>
                </div>
                )
        }
    }

    renderTotalOrder = () =>{

        const shipping_cost = parseInt(this.state.shipping_cost.shipping_cost)
        const total_order = parseInt(this.state.totalOrder)
        const discount = parseInt(this.state.coupon_value)

        var summary1 = total_order - discount
        var summary2 = total_order + shipping_cost - discount

        console.log(summary1)
        console.log(summary2)

        if(!shipping_cost){
            return( 
                <div className='mb-4'>
                    Summary: <p style={{color:'red'}} className="card-text"><b>Rp {summary1.toLocaleString('IN')},00</b></p>
                </div>
            )
        }else{
            return(
                <div className='mb-4'>
                    Summary: <p style={{color:'red'}} className="card-text"><b>Rp {summary2.toLocaleString('IN')},00</b></p>
                </div>
            )
        }
    }

    handleCheckoutButton = () =>{
        const shipping_cost = parseInt(this.state.shipping_cost.shipping_cost)
        const total_order = parseInt(this.state.totalOrder)
        const discount = parseInt(this.state.coupon_value)
        const main_address= this.state.main_address

        const user_id = this.props.user.id
        const username = this.props.user.username
        const order_recipient = main_address.order_recipient
        const recipient_address = main_address.address.concat(` , ${main_address.city}, ${main_address.postal_code}`)
        const phone_number = main_address.phone_number
        const total = total_order + shipping_cost - discount

        axios.post(`/finalcheckout`,{user_id,username,order_recipient,recipient_address,phone_number,total}).then(res=>{
            console.log(res)
            if(res.data.sqlMessage){
                console.log('error checkout')
            }else{
                var cart = this.state.cart
                //kurangin stock produk
                for(var i = 0; i<cart.length; i++){
                    axios.patch(`/checkoutupdatestock`,
                        {
                            quantity: cart[i].quantity,
                            product_id: cart[i].product_id
                        }
                    ).then((res)=>{
                        if(res.data.affectedRows){
                            console.log(res)
                            this.setState({orderCompleted:1})
                        }
                    })
                }
            }
        })
    }

    renderOrderSummary = () =>{
        const totalOrder = this.state.totalOrder
        const shipping_cost = this.state.shipping_cost.shipping_cost
        console.log(shipping_cost)

        if(this.state.cart.length === 0){
            return(
                <div>
                </div>
            )
        }else{
            if(this.state.use_coupon !== true){
                return(
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order Summary</h5>
                                Total: <p className="card-text"><b>Rp {totalOrder.toLocaleString('IN')},00</b></p>
                                {this.renderShippingCost()}
                                {this.renderTotalOrder()}
                                
                                <button onClick={this.handleCheckoutButton} className="btn btn-block btn-warning">Checkout</button>

                            </div>
                        </div>
                        <div NameName="card mt-3 w-75">
                        <div className="card-body">
                            <h5 className="card-title">Coupon</h5>
        
                            <div className="input-group mb-3">
                            <input ref={input=>this.coupon = input} type="text" className="form-control" placeholder="Coupon code"/>
                            </div>
                                <button onClick={this.handleAddCoupon} className='btn btn-light'>Use coupon</button>
                            
                        </div>
                    </div>
                    </div>

                )
            }else{
                return(
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            Total: <p className="card-text"><b>Rp {totalOrder.toLocaleString('IN')},00</b></p>
                            Discount: <p className="card-text"><b>-Rp {this.state.coupon_value.toLocaleString('IN')},00 <button onClick={this.handleRemoveCoupon} className='btn btn-sm btn-light ml-3'>cancel</button></b></p>
                            {this.renderShippingCost()}
                            {this.renderTotalOrder()}

                            <button onClick={this.handleCheckoutButton} className='btn btn-block btn-warning'>Checkout</button>
                        </div>
                    </div>
                )
            }
        }
    }

    //FOR RENDERING ALL USER ADDRESS

    getAllUserAddress = () =>{
        axios.get(`/getalluseraddress/${this.props.user.id}`).then(res=>{
            this.setState({address_list:res.data})
        })
    }

    renderAllUserAddress = () =>{
        const user = this.props.user
        if(this.state.address_list.length === 0){
            return(

                <div class="d-flex justify-content-center">
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }else{
            return this.state.address_list.map((val,index)=>{
                return(
                    <AllUserAddress renderAll={()=>{this.renderAll()}} getAllUserAddress={()=>{this.getAllUserAddress()}} val={val} index={index} user_id={user.id}/>
                )
            })
        }
    }

    renderShippingAddress = () =>{
        const user = this.props.user
        const main_address = this.state.main_address
        console.log(main_address)

        if(this.state.main_address !== ''){
            return(
                <div className="card mb-5">
                    <div className="card-body">
                        <h4 className='mb-3 pb-3 border-bottom'>Shipping Address</h4>
                        <p><b>Recipient: </b>{main_address.order_recipient}</p>
                        <p><b>Phone number: </b>{main_address.phone_number}</p>
                        <p><b>Address: </b>{main_address.address.concat(` , ${main_address.city}, ${main_address.postal_code}`)}</p>
                        <div className='my-3'>

                        {/* ADD NEW ADDRESS MODAL */}
                        <button type="button" className="btn btn-outline-secondary mr-3" data-toggle="modal" data-target="#addNewAddress">
                        Add new address
                        </button>

                        <div className="modal fade" id="addNewAddress" tabindex="-1" role="dialog" aria-labelledby="addNewAddressTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Add New Address</h5>

                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>

                                </div>
                                <div className="modal-body">
                                    {/* INPUT NEW ADDRESS */}
                                    <AddressInput mainAddress={this.state.main_address} user_id ={user.id}
                                    renderAll={()=>this.renderAll()}/>
                                </div>
                                </div>
                            </div>
                        </div>

                        {/* SEE ALL ADDRESS */}
                        <button onClick={this.getAllUserAddress} type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target="#renderUserAddress">
                        Choose another address
                        </button>

                        <div className="modal fade" id="renderUserAddress" tabindex="-1" role="dialog" aria-labelledby="renderUserAddressTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">{user.first_name.concat(` ${user.last_name}`)} address</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {this.renderAllUserAddress()}
                                </div>
                                    </div>
                            </div>
                        </div>


                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className='card mb-5'>
                    <div className='card-body'>
                        <h4>Shipping Address</h4>
                        <AddressInput mainAddress={this.state.main_address} user_id ={user.id}
                        renderAll={()=>this.renderAll()}/>
                    </div>
                </div>
            )
        }
    } 
    

    render(){
        const cart = this.state.cart
        const totalOrder = this.state.totalOrder

        console.log(cart)
        console.log(this.state.address_list)
        if(this.props.user.id === ''){
            return(
                <Redirect to = '/'/>
            )
        }else{
            if(totalOrder === ''){
                return(
                    <div>
                        <Loader/>
                    </div>
                )
            }else if(this.state.orderCompleted === 1){
                return(
                    <div>
                        <Header/>
                        <div className='container'>
                            <h3 className='mt-5'>Thank you for your order</h3>
                            <p>Please verify your order by sending us your payment confirmation proof in your orders page</p>
                            <Link to='/orders'>
                                <button className='btn btn-primary'>Orders Page</button>
                            </Link>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <Header/>
                        <div className='container'>
                            <div className='row mt-5'>
                                <div className='col-md-8'>
                                    {/* Add Shipping Address */}
                                    {this.renderShippingAddress()}
    
                                    {/* Cart table */}
                                    <table class="table">
                                        <tbody>
                                            {this.renderCart()}
                                        </tbody>
                                    </table>
                                </div>
    
                                {/* Order Summary*/}
                                <div className='col'>
                                    {this.renderOrderSummary()}
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps)(Cart)