import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import AdminHeader from '../../headers/AdminHeader'

class AddProduct extends Component{
    render(){
        return(
            <div>
                <AdminHeader/>
                <div className='container'>
                    <div className="card my-3 mb-5">

                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <Link style={{color:'black'}} to='/admin/manageproducts'>
                                        <a className="nav-link" href="#">Manage Products</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link style={{color:'black'}} to='/admin/managecategories'>
                                        <a className="nav-link" href="#">Manage Categories</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link style={{color:'black', textDecoration:'none'}} to='/admin/addproduct'>
                                        <a className="nav-link active" href="#">Add Product</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body">
                            <h5 className="card-title">New Product</h5>

                            <form>
                            <div className="form-group">
                                <label for="exampleFormControlInput1">Product Name</label>
                                <input  type="email" className="form-control w-100" id="exampleFormControlInput1" ref={(productName) => {this.productName = productName}}/>
                                <small className="form-text text-muted mt-3">
                                    Product name must be less than 30 characters
                                </small>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4">Price</label>
                                    <input type="number" min='1' className="form-control" id="inputEmail4" placeholder='Rp'/>
                                    <small className="form-text text-muted mt-3">
                                    Input only number
                                    {/*  <p className='card-text'>Rp{price.toLocaleString('IN')},-</p> */}
                                    </small>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4">Stock</label>
                                    <input type="number" min='1' className="form-control" id="inputPassword4" placeholder="Min 1" defaultValue='1'/>
                                    <small className="form-text text-muted mt-3">
                                    Minimum 1 product in stock
                                    </small>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Product Description</label>
                                <textarea style={{height:'150px'}} className="form-control" id="exampleFormControlTextarea1" ref={(input) => {this.productDescription = input}}></textarea>
                            </div>

                            <div className="form-row">
                                

                                <div className="form-group col-md-4">
                                    <label for="inputPassword4">Weight</label>
                                    <input type="number" min='1' className="form-control" id="inputPassword4" placeholder="Kg" defaultValue='1'/>
                                    <small className="form-text text-muted mt-3">
                                        Default weight is 1 kg
                                    </small>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="inputState">Product Category</label>
                                    <select id="inputState" class="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                            </div>
                            </form>
                            
                            <button className='btn btn-success mt-5 btn-block' onClick={this.handleAddProduct}>Add Product</button>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default AddProduct