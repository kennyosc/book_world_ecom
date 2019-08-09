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

    renderAll = () =>{
        axios.get('/allproducts').then(res=>{
            this.setState({products: res.data})
        })
    }

    handleDeleteProduct = (id) =>{
        axios.delete(`/deleteproduct/${id}`).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    renderAllProducts = () =>{
        return this.state.products.map((val)=>{
            if(val.stock == 0){
                return(
                    <tr>
                        <th scope="row">{val.id}</th>
                        <td>{val.name}</td>
                        <td>Rp {val.price.toLocaleString('IN')},-</td>
                        <td>{val.stock}</td>
                        <td>Stock Empty</td>
                        <td><Link to={`/admin/editproduct/${val.id}`}><button className='btn btn-outline-success btn-sm mx-2'>Edit</button></Link><button onClick={()=>this.handleDeleteProduct(val.id)} className='btn btn-outline-danger btn-sm'>Delete</button></td>
                    </tr>
                )
            } else{
                return(
                    <tr>
                        <th scope="row">{val.id}</th>
                        <td className='text-left'>{val.name}</td>
                        <td style={{width:'15%'}}>Rp {val.price.toLocaleString('IN')},-</td>
                        <td>{val.stock}</td>
                        <td>Live</td>
                        <td className='w-25'><Link to={`/admin/editproduct/${val.id}`}><button className='btn btn-outline-success btn-sm mx-2'>Edit</button></Link><button onClick={()=>this.handleDeleteProduct(val.id)} className='btn btn-outline-danger btn-sm'>Delete</button></td>
                    </tr>
                )
            }
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

                        <div class="card-body">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{width:'20%'}} scope="col">Product Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Status</th>
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