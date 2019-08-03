import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import AdminHeader from '../../headers/AdminHeader'

class ManageCategories extends Component{
    render(){
        return(
            <div>
                <AdminHeader/>
                <div className='container'>
                    <div class="card text-center mt-3">

                        <div class="card-header">
                            <ul class="nav nav-tabs card-header-tabs">
                                <li class="nav-item">
                                    <Link style={{color:'black'}} to='/admin/manageproducts'>
                                        <a class="nav-link" href="#">Manage Products</a>
                                    </Link>
                                </li>

                                <li class="nav-item">
                                    <Link style={{color:'black', textDecoration:'none'}} to='/admin/managecategories'>
                                        <a class="nav-link active" href="#">Manage Categories</a>
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
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ManageCategories