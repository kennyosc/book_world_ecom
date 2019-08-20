import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header.js'

import ProfileNav from './ProfileNav'
import axios from '../../config/axios.js'
import Loader from '../../Loader'

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
    1. photo not sent and order_status 0 => payment pending
    2. photo sent and order_status 0 => waiting for payment confirmation
    3. photo sent and order_status 1 => order completed
    */

    renderOrders=()=>{
        console.log(this.state.user_orders)
        if(this.state.user_orders.length !== 0){
            return this.state.user_orders.map((val)=>{
                if(val.payment_confirmation === null){
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
                                    
                                <button style={{fontSize:'0.7em'}} className='btn btn-primary btn-sm' onClick={this.handleUploadPaymentProof}>Upload payment proof</button>
                            </td>
                        </tr>
                    )
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
                }else if(val.payment_confirmation === null && val.order_status === 1){
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