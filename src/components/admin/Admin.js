import React,{Component} from 'react'
import AdminHeader from '../headers/AdminHeader.js'

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
                            <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={admin_orders} alt="Card image cap"/>
                            <div className="card-body">
                            <h5 className="card-title">Orders</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src={admin_people} alt="Card image cap"/>
                            <div className="card-body">
                            <h5 className="card-title">People</h5>
                            <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin