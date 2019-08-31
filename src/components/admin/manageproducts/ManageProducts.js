import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import axios from '../../../config/axios.js'

import AdminHeader from '../../headers/AdminHeader'

class ManageProducts extends Component{

    state={
        products: [],
        product_details:''
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

    handleProductDetails = (product_id) =>{
        axios.get('/productdetails/'+product_id).then(res=>{
            this.setState({product_details:res.data})
        })
    }

    renderProductItem =() =>{
        if(this.state.product_details === ''){
            return(
                <div>
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="spinner-grow text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            )
        }else{
            const val = this.state.product_details
            return(
                <tr className='border-bottom'>
                    <td className='w-25'><img className="img-thumbnail w-50 mx-auto d-block" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt={val.photo}/></td>
                    <td className='w-50 text-left'>
                        <p><b>Title: </b>{val.name}</p>
                        <p><b>Price: </b>Rp{val.price.toLocaleString('IN')},00</p>
                        <p><b>Description: </b>{val.description}</p>
                        <p><b>Author: </b>{val.author}</p>
                        <p><b>Published: </b>{val.published}</p>
                    </td>
                </tr>
                )
        }
    }

    renderAllProducts = () =>{
        return this.state.products.map((val)=>{
                return(
                    <tr style={{fontSize:'0.9em'}}>
                        <th scope="row">{val.id}</th>
                        <td className='text-left'>
                            {val.name}
                        </td>
                        <td>Rp {val.price.toLocaleString('IN')},-</td>
                        <td>{val.stock}</td>
                        <td>{val.stock === 0 ? 'Out of stock' : val.stock}</td>
                        <td>
                            <button onClick={()=>this.handleProductDetails(val.id)} data-toggle="modal" data-target="#product_item" className='btn btn-outline-primary btn-sm'>Details</button>
                            <Link to={`/admin/editproduct/${val.id}`}>
                                <button className='btn btn-outline-success btn-sm mx-2'>Edit</button>
                            </Link>
                            <button onClick={()=>this.handleDeleteProduct(val.id)} className='btn btn-outline-danger btn-sm'>Delete</button>

                            {/* LAUNCH MODAL */}
                            <div className="modal fade" id="product_item" tabindex="-1" role="dialog" aria-labelledby="product_itemTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-center" id="exampleModalLongTitle">Book</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                    <table className="table">
                                        <tbody>
                                            {this.renderProductItem()}
                                        </tbody>
                                    </table>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
        })
    }

    render(){
        if(this.props.admin.id === ''){
            return(
                <Redirect to ='/login-admin'/>
            )
        }else{
            return(
                <div>
                    <AdminHeader/>
                    <div className='container'>
                        <div className="card text-center mt-3">
    
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <Link style={{color:'black', textDecoration:'none'}} to='/admin/manageproducts'>
                                            <a className="nav-link active" href="#">Manage Products</a>
                                        </Link>
                                    </li>
    
                                    <li className="nav-item">
                                        <Link style={{color:'black'}} to='/admin/managecategories'>
                                            <a className="nav-link" href="#">Manage Categories</a>
                                        </Link>
                                    </li>
    
                                    <li className="nav-item">
                                        <Link style={{color:'black'}} to='/admin/addproduct'>
                                            <a className="nav-link" href="#">Add Product</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
    
                            <div className="card-body">
                                <div className='table-responsive'>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th style={{width:'12%'}} scope="col">Product Id</th>
                                                <th style={{width:'30%'}} scope="col">Name</th>
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
                                </div>
    
                                
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

export default connect(mapStateToProps)(ManageProducts)