import React,{Component} from 'react'

/*
1. cost of all coupons in 1 -3 months
2. total sales per month
3. total books sold per month
4. average rating for all books
5. Total users
*/

class Stats extends Component{

    componentDidMount(){
        
    }

    render(){
        return(
            <div className='row'>
                <div class="card col-3 mt-3 mx-3">
                    <div class="card-body">
                        <h5 class="card-title">Total Sales</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

                <div class="card col-4 mt-3 mx-3">
                    <div class="card-body">
                        <h5 class="card-title">Total Books Sold</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

                <div class="card col-3 mt-3 mx-3">
                    <div class="card-body">
                        <h5 class="card-title">Average Book Rating</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

                <div class="card col-5 mt-3 mx-3">
                    <div class="card-body">
                        <h5 class="card-title">Total Users</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>

                <div class="card col-4 mt-3 mx-3">
                    <div class="card-body">
                        <h5 class="card-title">Cost Of All Coupons</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Stats