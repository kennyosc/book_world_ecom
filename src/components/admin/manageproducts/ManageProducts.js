import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import AdminHeader from '../../headers/AdminHeader'

class ManageProducts extends Component{
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
                                    <th className='w-25' scope="col">Product Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                        <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                        <td>@twitter</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                        <td>@twitter</td>
                                </tr>
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