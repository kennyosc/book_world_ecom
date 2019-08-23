import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header.js'

import ProfileNav from './ProfileNav'
import axios from '../../config/axios.js'
import Loader from '../../Loader'

class Profile extends Component{

    state={
        user_orders:'',
        selectedOrder:''
    }

    componentDidMount(){
        axios.get(`/userorders/${this.props.user.id}`).then(res=>{
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
        const formData = new FormData()
        
        console.log(payment_proof)
        console.log(user_id)
        console.log(order_id)
        formData.append('payment_proof', payment_proof)
        formData.append('order_id',order_id)
        formData.append('user_id',user_id)
    
        axios.patch('/uploadpaymentproof', formData).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    /*
    1. photo not sent and order_status 0 => payment pending
    2. photo sent and order_status 0 => waiting for payment confirmation
    3. photo sent and order_status 1 => order completed
    */

    renderOrders=()=>{
        console.log(this.state.user_orders)
        console.log(this.state.selectedOrder)
        if(this.state.user_orders.length !== 0){
            return this.state.user_orders.map((val)=>{
                if(val.payment_confirmation === null){
                    if(val.id !== this.state.selectedOrder){
                        return(
                            <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td style={{width:'10%'}}>{val.phone_number}</td>
                            <td className='w-25'>{val.recipient_address}</td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%',color:'red'}} className='text-center'>Payment pending</td>
                            <td className='text-center w-75'>
                                <button style={{fontSize:'0.8em'}} className='btn btn-primary btn-sm mr-2' onClick={()=>this.setState({selectedOrder:val.id})}>Upload</button>
                                <button style={{fontSize:'0.8em'}} className='btn btn-danger btn-sm'>Cancel Order</button>
                            </td>
                        </tr>
                        )
                    }else{
                        return(
                            <tr className='border-bottom text-center'>
                                <td style={{width:'10%'}}>{val.created_at}</td>
                                <td style={{width:'13%'}}>{val.order_recipient}</td>
                                <td style={{width:'10%'}}>{val.phone_number}</td>
                                <td className='w-25'>{val.recipient_address}</td>
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
                }else if(val.payment_confirmation !== null && val.order_status === 0){
                    return(
                        <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td style={{width:'10%'}}>{val.phone_number}</td>
                            <td className='w-25'>{val.recipient_address}</td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%'}} className='text-center'>Waiting for payment confirmation</td>
                            <td style={{width:'10%'}} className='text-center'>Waiting for payment confirmation</td>
                        </tr>
                    )
                }else if(val.payment_confirmation !== null && val.order_status === 1){
                    return(
                        <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td style={{width:'10%'}}>{val.phone_number}</td>
                            <td className='w-25'>{val.recipient_address}</td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%'}} className='text-center'>Order completed</td>
                            <td style={{width:'10%'}} className='text-center'>Order completed</td>
                        </tr>
                    )
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
                                                    <th>Date</th>
                                                    <th>Recipient</th>
                                                    <th>Phone Number</th>
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