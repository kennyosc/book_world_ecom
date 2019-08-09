import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

import AdminHeader from '../../headers/AdminHeader'
import axios from '../../../config/axios'

class ManageAdmins extends Component{

    state = {
        admins: []
    }

    componentDidMount(){
        axios.get('/alladmins').then(res=>{
            this.setState({admins: res.data})
        })
    }

    renderAll= () =>{
        axios.get('/alladmins').then(res=>{
            this.setState({admins: res.data})
        })
    }

    deleteAdmin = (id) =>{
        axios.delete(`/deleteadmin/${id}`).then(res=>{
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Admin removed!',
                showConfirmButton: false,
                timer: 1500
              })
            this.renderAll()
        })
    }

    renderAllAdmins = () =>{
        return this.state.admins.map(val=>{
            return(
                <tr>
                    <th scope="row">{val.id}</th>
                    <td scope="row">{val.username}</td>
                    <td scope="row">{val.email}</td>
                    <td><button onClick={()=>this.deleteAdmin(val.id)} className='btn btn-outline-danger btn-sm mx-2'>Delete</button></td>
                </tr>
            )
        })
    }

    handleAddAdmin = (event) =>{
        event.preventDefault()
        const username = this.username.value
        const email = this.email.value
        const password = this.password.value
        const passwordConfirmation = this.passwordConfirmation.value

        if(password === passwordConfirmation){
            axios.post('/addadmin',
                {
                    username,
                    email,
                    password
                }
            ).then(res=>{
                this.renderAll()
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Admin added!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
        } else{
            Swal.fire({
                type: 'error',
                title: 'Password does not match',
                text: 'Please match your password'
                })
        }
    }

    render(){
        return(
            <div>
                <AdminHeader/>
                <div className='container'>
                    <div class="card text-center mt-3">

                        <div class="card-header">
                            <ul class="nav nav-tabs card-header-tabs">
                                <li class="nav-item">
                                    <Link style={{color:'black', textDecoration:'none'}} to='/admin/managepeople'>
                                        <a class="nav-link" href="#">Manage Users</a>
                                    </Link>
                                </li>

                                <li class="nav-item">
                                    <Link style={{color:'black'}} to='/admin/manageadmin'>
                                        <a class="nav-link active" href="#">Manage Admins</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div class="card-body">
                        <h5 className="card-title">Add New Admin</h5>

                        <form>
                            <div class="form-row">
                                <div class="col">
                                <input type="text" class="form-control" placeholder="Username" ref={input => this.username = input}/>
                                </div>
                                <div class="col">
                                <input type="text" class="form-control" placeholder="Email" ref={input => this.email = input}/>
                                </div>
                            </div>

                            <div className='my-3'>
                                <input type="password" class="form-control" id="inputPassword" placeholder="Password" ref={input => this.password = input}/>
                            </div>
                            <div className='my-3'>
                                <input type="password" class="form-control" id="inputPassword" placeholder="Password Confirmation" ref={input => this.passwordConfirmation = input}/>
                            </div>

                            <button onClick={this.handleAddAdmin} className='btn btn-primary mb-5'>Add New Admin</button>
                        </form>




                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAllAdmins()}
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

export default ManageAdmins