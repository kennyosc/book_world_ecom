import React,{Component} from 'react'
import AdminHeader from '../headers/AdminHeader.js'
import {Link} from 'react-router-dom'

import admin_orders from '../../images/admin/admin_orders.jpg'
import admin_people from '../../images/admin/admin_people.jpg'
import admin_products from '../../images/admin/admin_products.jpg'

class Admin extends Component{
    render(){
        return(
            <div>
                <AdminHeader/>
                <div className='container mt-5'>
                    <div className="card-deck">
                        <div className="card">
                            <img className="card-img-top" src={admin_products} alt="Card image cap"/>
                            <div className="card-body">
                            <h5 className="card-title">Products</h5>
                            <p className="card-text">This is where you can manage your products and product categories</p>
                            </div>
                            <Link to='/admin/manageproducts'>
                                <button className='btn btn-primary btn-block'>Manage Products</button>
                            </Link>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={admin_orders} alt="Card image cap"/>
                            <div className="card-body">
                            <h5 className="card-title">Orders</h5>
                            <p className="card-text">Manage users orders here!</p>
                            </div>
                            <Link to='/admin/orders'>
                                <button className='btn btn-primary btn-block'>Manage Orders</button>
                            </Link>

                        </div>
                        <div className="card">
                            <img className="card-img-top" src={admin_people} alt="Card image cap"/>
                            <div className="card-body">
                            <h5 className="card-title">People</h5>
                            <p className="card-text">Here you can see users account and manage admins</p>
                            </div>
                            <Link to='/admin/people'>
                                <button className='btn btn-primary btn-block'>Manage People</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin