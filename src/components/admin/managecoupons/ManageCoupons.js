import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import Swal from 'sweetalert2'

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

        if(promotion_title === '' || coupon_code === '' || coupon_value === '' || quantity === '' || coupon_limit === ''){
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Please insert all the required field'
              })
        }else{
            if(promotion_title.length > 15){
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Title must be less than 16 characters'
                  })
            }else if(coupon_code.length > 8){
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Coupon code must be less than 9 characters'
                  })
            }else if(coupon_value < 10000){
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Minimum coupon value is Rp 10.000,-'
                  })
            }else if(quantity < 10){
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Minimum coupon quantity is 10'
                  })
            }else if(coupon_limit < 1 && coupon_limit >100){
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Minimum coupon quantity is 10 and maximum is 100'
                  })
            }else{
                axios.post(`/submitnewcoupon`,{promotion_title,coupon_code,coupon_value,quantity,coupon_limit}).then(res=>{
                    console.log(res)
                    this.renderAll()
                })
            }
        }
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
                                    <div className="form-row justify-content-md-center">
                                        <div className="col-3 mb-3">
                                            <input onChange={(event)=>this.setState({promotion_name: event.target.value})} type="text" className="form-control" placeholder="Promotion Name (Max 15 char)"/>
                                        </div>
                                        <div className="col-3 mb-3">
                                            <input onChange={(event)=>this.setState({coupon_code: event.target.value})} type="text" className="form-control" placeholder="Coupon Code (Max 8 code)"/>
                                        </div>
                                        <div className="col-4 mb-3">
                                            <input onChange={(event)=>this.setState({coupon_value: event.target.value})} type="number" min='10000' max='1000000' step='1000' className="form-control" placeholder="Promotion Value (Min Rp10.000,-)"/>
                                        </div>
                                        <div className="col-3 mb-3">
                                            <input onChange={(event)=>this.setState({coupon_quantity: event.target.value})} type="number" min='1' className="form-control" placeholder="Coupon Quantity (Min 10)"/>
                                        </div>
                                        <div className="col-3 mb-3">
                                            <input onChange={(event)=>this.setState({coupon_limit: event.target.value})} type="number" min='1' className="form-control" placeholder="Limit Per user(Min 1, Max 100)"/>
                                        </div>
                                        
                                        <div className="col-auto">
                                            <button onClick={(event)=>this.handleSubmitNewCoupon(event)} type="submit" className="btn btn-primary mb-2">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className='table-responsive'>
                                <table className="table table-hover ">
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

export default connect(mapStateToProps)(ManageCoupons)