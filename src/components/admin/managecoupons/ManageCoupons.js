import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import AdminHeader from '../../headers/AdminHeader'
import axios from '../../../config/axios';

class ManageCoupons extends Component{

    state={
        allCoupons:[],
        promotion_name:'',
        coupon_code:'',
        coupon_value: 0,
        coupon_quantity:0,
        coupon_limit:0
    }

    componentDidMount(){
        axios.get(`allcoupons`).then(res=>{
            this.setState({allCoupons: res.data})
        })
    }

    renderAll = () =>{
        axios.get(`allcoupons`).then(res=>{
            this.setState({allCoupons: res.data})
        })
    }

    handleDeleteCoupon = (coupon_id) =>{
        axios.delete(`/deletecoupon/${coupon_id}`).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    handleSubmitNewCoupon = (event) =>{
        event.preventDefault()

        const promotion_title = this.state.promotion_name
        const coupon_code = this.state.coupon_code
        const coupon_value = this.state.coupon_value
        const quantity = this.state.coupon_quantity
        const coupon_limit = this.state.coupon_limit

        axios.post(`/submitnewcoupon`,{promotion_title,coupon_code,coupon_value,quantity,coupon_limit}).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    renderAllCoupons= () =>{
        if(this.state.allCoupons.length === 0){
            return(
                <tr>
                    <td colSpan='6'>
                        <div class="spinner-grow text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="spinner-grow text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </td>
                </tr>
            )
        }else{
            return this.state.allCoupons.map(val=>{
                return(
                    <tr>
                        <td>{val.promotion_title}</td>
                        <td>{val.coupon_code}</td>
                        <td>Rp {val.coupon_value.toLocaleString('IN')},-</td>
                        <td>{val.quantity}</td>
                        <td>{val.coupon_limit}</td>
                        <td><button className='btn btn-danger btn-sm' onClick={()=>this.handleDeleteCoupon(val.id)}>Delete</button></td>
                    </tr>
                )
            })
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
                                        <Link style={{color:'black', textDecoration:'none'}} to='/admin/managecoupons'>
                                            <a class="nav-link active" href="#">Manage Coupons</a>
                                        </Link>
                                    </li>
                                </ul> 
                            </div>

                            <div class="card-body">

                            <div className='mb-4'>
                                <h5 className='mb-3'>Insert New Coupon</h5>
                                <form>
                                    <div class="form-row">
                                        <div class="col-3">
                                            <input onChange={(event)=>this.setState({promotion_name: event.target.value})} type="text" class="form-control" placeholder="Promotion Name"/>
                                        </div>
                                        <div class="col-2">
                                            <input onChange={(event)=>this.setState({coupon_code: event.target.value})} type="text" class="form-control" placeholder="Coupon Code"/>
                                        </div>
                                        <div class="col-2">
                                            <input onChange={(event)=>this.setState({coupon_value: event.target.value})} type="number" min='10000' max='1000000' step='1000' class="form-control" placeholder="Promotion Value"/>
                                        </div>
                                        <div class="col-2">
                                            <input onChange={(event)=>this.setState({coupon_quantity: event.target.value})} type="number" min='1' class="form-control" placeholder="Coupon Quantity"/>
                                        </div>
                                        <div class="col-2">
                                            <input onChange={(event)=>this.setState({coupon_limit: event.target.value})} type="number" min='1' class="form-control" placeholder="Limit Per user"/>
                                        </div>
                                        
                                        <div class="col-auto">
                                            <button onClick={(event)=>this.handleSubmitNewCoupon(event)} type="submit" class="btn btn-primary mb-2">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Promotion Title</th>
                                        <th>Coupon Code</th>
                                        <th>Value</th>
                                        <th>Quantity</th>
                                        <th>Usage Limit</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderAllCoupons()}
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
        admin: state.admin_auth,
        user:state.auth
    }
}

export default connect(mapStateToProps)(ManageCoupons)