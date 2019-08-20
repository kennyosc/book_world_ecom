import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header.js'

import ProfileNav from './ProfileNav'
import axios from '../../config/axios.js';

class Profile extends Component{

    state={
        user_orders:''
    }

    componentDidMount(){
        axios.get(`/userorders/${this.props.user.id}`).then(res=>{
            this.setState({user_orders:res.data})
        })
    }

    /*
    1. photo not sent and payment status 0
    2. photo sent and payment status 0

    */

    renderOrders=()=>{
        if(this.state.user_orders.length !== 0){
            return this.state.user_orders.map((val,index)=>{
                if(val.payment_status === 0){
                    return(
                        <tr className='border-bottom'>
                            <td className='w-25'>{val.created_at}</td>
                            <td className='w-25'>{val.order_recipient}</td>
                            <td className='w-25'>{val.phone_number}</td>
                            <td className='w-100'>{val.recipient_address}</td>
                            <td className='text-center w-75'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td className='text-center w-75'>Payment pending</td>
                            <td className='text-center w-75'><button style={{fontSize:'0.7em'}} className='btn btn-sm btn-outline-success'>Upload payment proof</button></td>
                        </tr>
                    )
                }else if(val.payment_status === 1 && val.order_status === 0){
                    return(
                        <tr className='border-bottom'>
                            <td className='w-25'>{val.created_at}</td>
                            <td className='w-25'>{val.order_recipient}</td>
                            <td className='w-25'>{val.phone_number}</td>
                            <td className='w-100'>{val.recipient_address}</td>
                            <td className='text-center w-75'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td className='text-center w-75'>Waiting for payment confirmation</td>
                            <td className='text-center w-75'><button style={{fontSize:'0.7em'}} className='btn btn-sm btn-outline-success'>Upload payment proof</button></td>
                        </tr>
                    )
                }else if(val.payment_status === 1 && val.order_status === 1){
                    return(
                        <tr className='border-bottom'>
                            <td className='w-25'>{val.created_at}</td>
                            <td className='w-25'>{val.order_recipient}</td>
                            <td className='w-25'>{val.phone_number}</td>
                            <td className='w-100'>{val.recipient_address}</td>
                            <td className='text-center w-75'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td className='text-center w-75'>Order finished</td>
                            <td className='text-center w-75'><button style={{fontSize:'0.7em'}} className='btn btn-sm btn-outline-success'>Upload payment proof</button></td>
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
            return(
                <div>
                <Header/>
                    <div className='container'>
                        <div className="row my-4">
                            <div className="col-sm-12 col-lg-2 position-sticky">
                                {/* PROFILE PAGES */}
                                <ProfileNav/>
                            </div>
                            <div class="card col-sm-12 col-md-9">
                                <div class="card-body">
                                    <table class="table table-hover">
                                        <tbody>
                                            <tr>
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
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.auth
    }
}

export default connect(mapStateToProps)(Profile)