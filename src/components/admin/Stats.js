import React,{Component} from 'react'
import axios from '../../config/axios';

/*
1. cost of all coupons in 1 -3 months
2. total sales per month
3. total books sold per month
4. average rating for all books
5. Total users
*/

class Stats extends Component{

    state={
        totalSales: 0,
        bookSold: 0,
        rating: 0,
        totalUsers:0,
        couponCost: 0
    }

    componentDidMount(){
        axios.get('/totalsalesonemonth').then(res=>{
            this.setState({totalSales: res.data})
        })

        axios.get('/totalbooksoldonemonth').then(res=>{
            this.setState({bookSold: res.data})
        })

        axios.get('/averagebookrating').then(res=>{
            this.setState({rating: res.data})
        })

        axios.get('/totalusers').then(res=>{
            this.setState({totalUsers: res.data})
        })

        axios.get('/totalcouponused').then(res=>{
            this.setState({couponCost: res.data})
        })
    }

    render(){
        if(this.state.totalSales === 0 || this.state.couponCost === 0){
            return(
                <div>
                    Calculating Data...
                </div>
            )
        } else{
            return(
                <div className='row'>
                    <div className="card col-2 mt-3 mx-3">
                        <div className="card-body">
                            <p className="card-title">Total 1 Month Sales</p>
                            <p className="card-text"><b>Rp{this.state.totalSales.totalOrders.toLocaleString('IN')},-</b></p>
                        </div>
                    </div>
    
                    <div className="card col-2 mt-3 mx-3">
                        <div className="card-body">
                            <p className="card-title">Total 1 Month Books Sold</p>
                            <p className="card-text"><b>{this.state.bookSold.bookSold} books</b></p>
                        </div>
                    </div>
    
                    <div className="card col-2 mt-3 mx-3">
                        <div className="card-body">
                            <p className="card-title">Average Book Rating</p>
                            <p className="card-text"><b>{this.state.rating.rating}/5<i style={{color:'grey'}} className="fas fa-star"></i></b></p>
                        </div>
                    </div>
    
                    <div className="card col-2 mt-3 mx-3">
                        <div className="card-body">
                            <p className="card-title">Cost Of All Coupons Used</p>
                            <p className="card-text"><b>Rp{this.state.couponCost.couponCost.toLocaleString('IN')},-</b></p>
                        </div>
                    </div>
    
                    <div className="card col-2 mt-3 mx-3">
                        <div className="card-body">
                            <p className="card-title">Total Number Of Users</p>
                            <p className="card-text"><b><i style={{color:'grey'}} className="fas fa-users"></i> {this.state.totalUsers.totalUsers}</b></p>
                        </div>
                    </div>
                    
                </div>
            )
        }
    }
}

export default Stats