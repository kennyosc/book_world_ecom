import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header'
import axios from '../../config/axios'
import Loader from '../../Loader'
import Swal from 'sweetalert2'

import {deleteFromCart, addCoupon, removeCoupon} from '../../actions/index'

class Cart extends Component{

    state={
        cart:'',
        totalOrder: '',
        coupon_value:0,
        coupon_id:'',
        use_coupon: false
    }

    componentDidMount(){
        const user_id = this.props.user.id

        //get cart by user_id
        axios.get(`/getusercart/${user_id}`).then(res=>{
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
            }
        })
    }

    handleDeleteFromCart= async(product_id) =>{

        const user_id = this.props.user.id
        const data = await deleteFromCart(user_id,product_id)
        console.log(data)

        if(data.affectedRows){
            this.renderAll()
        }        
    }

    handleAddCoupon = async() =>{
        const coupon_code = this.coupon.value
        const user_id = this.props.user.id
        const totalOrder = this.state.totalOrder
        
        if(coupon_code === ''){
            Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Please insert coupon'
                  })
        }else{
            const data = await addCoupon(user_id,coupon_code,totalOrder)
            console.log(data)

            //dari action di return ke depan, karena mau melanjutkan hasil return tsb dengan function lainn
            if(data.affectedRows){
                console.log(data)
                console.log(totalOrder)
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

    renderCart = () =>{
        if(this.state.cart.length !== 0){
            var hasil = this.state.cart.map(val=>{
                return(
                    <tr className='border-bottom'>
                        <td><button style={{color:'lightgrey'}} className='btn' onClick={()=>this.handleDeleteFromCart(val.id)}><i className="fas fa-window-close"></i></button></td>
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

    renderOrderSummary = () =>{
        const totalOrder = this.state.totalOrder

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
                                <Link to={`/shipment`}>
                                    <button className='btn btn-block btn-primary'>Proceed to shipment</button>
                                </Link>
                            </div>
                        </div>
                        <div className="card mt-3 w-75">
                        <div className="card-body">
                            <h5 className="card-title">Coupon</h5>
        
                            <div className="input-group mb-3">
                            <input ref={input=>this.coupon = input} type="text" className="form-control" placeholder="Coupon code"/>
                            </div>
                                <button onClick={this.handleAddCoupon} className='btn  btn-light'>Use coupon</button>
                            
                        </div>
                    </div>
                    </div>

                )
            }else{
                return(
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            Total: <p style={{color:'red'}} className="card-text"><b>Rp {totalOrder.toLocaleString('IN')},00</b></p>
                            Discount: <p className="card-text"><b>-Rp {this.state.coupon_value.toLocaleString('IN')},00 <button onClick={this.handleRemoveCoupon} className='btn btn-sm btn-light ml-3'>cancel</button></b></p>
                            <Link to={`/shipment`}>
                                <button className='btn btn-block btn-primary'>Proceed to shipment</button>
                            </Link>
                        </div>
                    </div>
                )
            }
        }
    }

    render(){
        const cart = this.state.cart
        const totalOrder = this.state.totalOrder

        console.log(cart)

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
            }else{
                return(
                    <div>
                        <Header/>
                        <div className='container'>
                            <div className='row mt-5'>
                                <div className='col-md-8'>
                                    <table class="table">
                                        <tbody>
                                            {this.renderCart()}
                                        </tbody>
                                    </table>
                                </div>
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