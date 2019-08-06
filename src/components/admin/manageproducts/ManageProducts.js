import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../../config/axios.js'

import AdminHeader from '../../headers/AdminHeader'

class ManageProducts extends Component{

    state={
        products: []
    }

    componentDidMount(){
        axios.get('/allproducts').then(res=>{
            this.setState({products: res.data})
        })
    }

    renderAllProducts = () =>{
        return this.state.products.map((val)=>{
            return(
                <tr>
                    <th scope="row">{val.id}</th>
                    <td>{val.name}</td>
                    <td>Rp {val.price.toLocaleString('IN')},-</td>
                    <td>{val.stock}</td>
                    <td><button className='btn btn-outline-success btn-sm mx-2'>Edit</button><button className='btn btn-outline-danger btn-sm'>Delete</button></td>
                </tr>
            )
        })
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
                                    <Link style={{color:'black', textDecoration:'none'}} to='/admin/manageproducts'>
                                        <a class="nav-link active" href="#">Manage Products</a>
                                    </Link>
                                </li>

                                <li class="nav-item">
                                    <Link style={{color:'black'}} to='/admin/managecategories'>
                                        <a class="nav-link" href="#">Manage Categories</a>
                                    </Link>
                                </li>

                                <li class="nav-item">
                                    <Link style={{color:'black'}} to='/admin/addproduct'>
                                        <a class="nav-link" href="#">Add Product</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div class="card-body p-0">
                        <table class="table table-hover">
                            <thead>
                                <tr className='table-active'>
                                    <th style={{width:'20%'}} scope="col">Product Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderAllProducts()}
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

export default ManageProducts