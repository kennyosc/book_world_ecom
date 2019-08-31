import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import AdminHeader from '../../headers/AdminHeader'
import axios from '../../../config/axios';

class ManageOrders extends Component{

    state={
        allorders:'',
        payment_proof:''
    }

    componentDidMount(){
        axios.get(`/admin/alluserorders`).then(res=>{
            this.setState({allorders:res.data})
        })
    }

    renderAll = () =>{
        axios.get(`/admin/alluserorders`).then(res=>{
            this.setState({allorders:res.data})
        })
    }

    handleAcceptPayment=(order_id,user_id)=>{
        axios.patch('/acceptuserpayment',{id:order_id,user_id:user_id}).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    handleRejectPayment=(order_id, user_id)=>{
        axios.patch('/rejectuserpayment',{id:order_id,user_id:user_id}).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    renderAllOrders = () =>{
        if(this.state.allorders.length !== 0){
            return this.state.allorders.map((val)=>{
                if(val.canceled === 1){
                    return(
                        <tr className='border-bottom text-center'>
                            <td style={{width:'10%'}}>#bw_{val.id}</td>
                            <td style={{width:'13%'}}>{val.created_at}</td>
                            <td style={{width:'10%'}}>@{val.username}</td>
                            <td style={{width:'13%'}}>{val.order_recipient}</td>
                            <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                            <td style={{width:'10%',color:'red'}} className='text-center'>Order Cancelled</td>
                            <td  className='text-center'>-</td>
                        </tr>
                    )
                }else{
                    if(val.payment_confirmation === null){
                        return(
                            <tr className='border-bottom text-center'>
                                <td style={{width:'10%'}}>#bw_{val.id}</td>
                                <td style={{width:'13%'}}>{val.created_at}</td>
                                <td style={{width:'10%'}}>@{val.username}</td>
                                <td style={{width:'13%'}}>{val.order_recipient}</td>
                                <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                                <td style={{width:'10%',color:'orange'}} className='text-center'>Payment pending</td>
                                <td  className='text-center'>-</td>
                            </tr>
                        )
                    }else if(val.payment_confirmation !== null && val.order_status === 0){
                        return(
                            <tr className='border-bottom text-center'>
                                <td style={{width:'10%'}}>#bw_{val.id}</td>
                                <td style={{width:'13%'}}>{val.created_at}</td>
                                <td style={{width:'10%'}}>@{val.username}</td>
                                <td style={{width:'13%'}}>{val.order_recipient}</td>
                                <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                                <td style={{width:'10%',color:'blue'}} className='text-center'>Payment Confirmation</td>
                                <td style={{width:'13%'}} className='text-center'>
                                    <Link to={`/admin/paymentproof/${val.payment_confirmation}`}>
                                        <button style={{fontSize:'0.7em'}} className='btn btn-outline-primary btn-sm mr-1'>Detail</button>
                                    </Link>
                                    <button style={{fontSize:'0.7em'}} className='btn btn-success btn-sm mr-1' onClick={()=>this.handleAcceptPayment(val.id,val.user_id)}>Accept</button>
                                    <button style={{fontSize:'0.7em'}} className='btn btn-danger btn-sm' onClick={()=>this.handleRejectPayment(val.id,val.user_id)}>Reject</button>
                                </td>
                            </tr>
                        )
                    }else if(val.payment_confirmation !== null && val.order_status === 1){
                        return(
                            <tr className='border-bottom text-center'>
                                <td style={{width:'10%'}}>#bw_{val.id}</td>
                                <td style={{width:'13%'}}>{val.created_at}</td>
                                <td style={{width:'10%'}}>@{val.username}</td>
                                <td style={{width:'13%'}}>{val.order_recipient}</td>
                                <td style={{width:'10%'}} className='text-center'><b>Rp{val.total.toLocaleString('IN')},00</b></td>
                                <td style={{width:'10%'}} style={{color:'green'}} className='text-center'>Order Completed</td>
                                <td style={{width:'10%'}}  className='text-center'>-</td>
                            </tr>
                        )
                    }
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
                        <div className="card text-center mt-3">
    
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <Link style={{color:'black', textDecoration:'none'}} to='/admin/manageorders'>
                                            <a className="nav-link active" href="#">Manage Orders</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
    
                            <div className="card-body">
                                <div className='table-responsive'>
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Order Id</th>
                                                <th>Date</th>
                                                <th>User</th>
                                                <th>Order Recipient</th>
                                                <th>Total</th>
                                                <th style={{width:'15%'}}>Proof of Payment</th>
                                                <th style={{width:'15%'}}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{fontSize:'0.9em'}}>
                                            {this.renderAllOrders()}
                                        </tbody>
                                    </table>
                                </div>
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
        admin: state.admin_auth,
        user:state.auth
    }
}

export default connect(mapStateToProps)(ManageOrders)