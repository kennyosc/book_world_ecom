import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import AdminHeader from '../../headers/AdminHeader'
import axios from '../../../config/axios';

class ManageOrders extends Component{

    state={
        allorders:''
    }

    componentDidMount(){
        axios.get(`/admin/alluserorders`).then(res=>{
            this.setState({allorders:res.data})
        })
    }

    renderAllOrders = () =>{
        if(this.state.allorders.length !== 0){
            return this.state.allorders.map((val)=>{
                if(val.payment_confirmation === null){
                    return(
                        <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'10%'}}>@{val.username}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%',color:'red'}} className='text-center'>Payment pending</td>
                            <td style={{width:'10%',color:'red'}} className='text-center'>Payment pending</td>
                        </tr>
                    )
                }else if(val.payment_confirmation !== null && val.order_status === 0){
                    return(
                        <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'10%'}}>@{val.username}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%',color:'red'}} className='text-center'>Payment pending</td>
                            <td style={{width:'13%'}} className='text-center'>
                                <button style={{fontSize:'0.7em'}} className='btn btn-success btn-sm mr-1' onClick={this.handleAcceptPayment}>Accept</button>
                                <button style={{fontSize:'0.7em'}} className='btn btn-danger btn-sm' onClick={this.handleRejectPayment}>Reject</button>
                            </td>
                        </tr>
                    )
                }else if(val.payment_confirmation === null && val.order_status === 1){
                    return(
                        <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>{val.created_at}</td>
                            <td style={{width:'10%'}}>@{val.username}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%',color:'red'}} className='text-center'></td>
                            <td style={{width:'10%',color:'red'}} className='text-center'>Payment pending</td>
                        </tr>
                    )
                }
            })
        }else{
            return(
                <tr className='border-bottom'>
                    <td colspan='6' className='text-center'>Orders are empty</td>
                </tr>
            )
        }
    }

    render(){
        if(this.props.admin.id === ''){
            return(
                <Redirect to = '/login-admin'/>
            )
        }else{
            return(
                <div>
                    <AdminHeader/>
                    <div className='container'>
                        <div class="card text-center mt-3">
    
                            <div class="card-header">
                                <ul class="nav nav-tabs card-header-tabs">
                                    <li class="nav-item">
                                        <Link style={{color:'black', textDecoration:'none'}} to='/admin/manageproducts'>
                                            <a class="nav-link active" href="#">Manage Orders</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
    
                            <div class="card-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>User</th>
                                        <th>Order Recipient</th>
                                        <th>Total</th>
                                        <th>Proof of Payment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderAllOrders()}
                                </tbody>
                                </table>
                                <div/>
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
        admin: state.admin_auth
    }
}

export default connect(mapStateToProps)(ManageOrders)