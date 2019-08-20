import React,{Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from '../../../config/axios.js'
import {logoutButton} from '../../../actions/index.js'

import AdminHeader from '../../headers/AdminHeader'


class ManagePeople extends Component{

    state = {
        users: []
    }

    componentDidMount(){
        axios.get('/allusers').then(res=>{
            this.setState({users:res.data})
        })
    }

    renderAll = () =>{
        axios.get('/allusers').then(res=>{
            this.setState({users:res.data})
        })
    }

    suspendUser = (id) =>{
        this.props.logoutButton()

        axios.patch('/admin/suspenduser/' + id,
            {
                suspended:true
            }
        ).then(res=>{
            this.renderAll()
        })
    }

    unSuspendUser = (id) =>{
        axios.patch('/admin/suspenduser/' + id,
            {
                suspended:false
            }
        ).then(res=>{
            this.renderAll()
        })
    }

    verifyUser = (id) =>{
        axios.get(`/verify/${id}`).then(res=>{
            this.renderAll()
        })
    }

    renderAllUsers = () =>{
        return this.state.users.map(val=>{
            if(val.verified === 0){
                return(
                    <tr>
                        <th scope="row">{val.id}</th>
                        <td scope="row">{val.first_name}</td>
                        <td scope="row">{val.last_name}</td>
                        <td scope="row">{val.username}</td>
                        <td scope="row">{val.gender}</td>
                        <td scope="row">{val.email}</td>
                        <td scope="row">Unverified</td>
                        <td scope="row">Unverified</td>
                        <td><button onClick={()=>this.verifyUser(val.id)} className='btn btn-outline-success btn-sm mx-2'>Verify</button></td>
                    </tr>
                )
            }else if(val.verified === 1 && val.suspended === 0){
                return(
                    <tr>
                        <th scope="row">{val.id}</th>
                        <td scope="row">{val.first_name}</td>
                        <td scope="row">{val.last_name}</td>
                        <td scope="row">{val.username}</td>
                        <td scope="row">{val.gender}</td>
                        <td scope="row">{val.email}</td>
                        <td scope="row">Verified</td>
                        <td scope="row">Good</td>
                        <td><button onClick={()=>this.suspendUser(val.id)} className='btn btn-outline-danger btn-sm mx-2'>Suspend</button></td>
                    </tr>
                )
            }else if(val.verified === 1 & val.suspended === 1){
                return(
                    <tr>
                        <th scope="row">{val.id}</th>
                        <td scope="row">{val.first_name}</td>
                        <td scope="row">{val.last_name}</td>
                        <td scope="row">{val.username}</td>
                        <td scope="row">{val.gender}</td>
                        <td scope="row">{val.email}</td>
                        <td scope="row">Verified</td>
                        <td scope="row">Suspended</td>
                        <td><button onClick={()=>this.unSuspendUser(val.id)} className='btn btn-outline-danger btn-sm mx-2'>Unsuspend</button></td>
                    </tr>
                )
            }
           
        })
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
                                            <a class="nav-link active" href="#">Manage Users</a>
                                        </Link>
                                    </li>
    
                                    <li class="nav-item">
                                        <Link style={{color:'black'}} to='/admin/manageadmin'>
                                            <a class="nav-link" href="#">Manage Admins</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
    
                            <div class="card-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Verified</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderAllUsers()}
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
        admin : state.admin_auth
    }
}

export default connect(mapStateToProps,{logoutButton})(ManagePeople)