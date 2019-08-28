import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import AdminHeader from '../../headers/AdminHeader'
import axios from '../../../config/axios';

class PaymentProof extends Component{
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
                                        <Link style={{color:'black', textDecoration:'none'}} to='/admin/manageorders'>
                                            <a class="nav-link" href="#">Manage Orders</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">Payment Proof</a>
                                    </li>
                                </ul>
                            </div>
    
                            <div className="card-body">
                                <div className="text-center">
                                    <img src={`http://localhost:2019/adminpaymentproof/${this.props.match.params.imagename}`} className="rounded img-fluid img-thumbnails" alt={this.props.match.params.imagename}/>
                                </div>
                                <div/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }    }
}

const mapStateToProps = (state) =>{
    return{
        admin: state.admin_auth,
        user:state.auth
    }
}

export default connect(mapStateToProps)(PaymentProof)