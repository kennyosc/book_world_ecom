import React,{Component} from 'react'

import Header from '../headers/Header'
import axios from '../../config/axios';


class Cart extends Component{

    state={
        cart:[]
    }

    componentDidMount(){
        const user_id = this.props.match.params.user_id

        axios.get(`/getusercart/${user_id}`).then(res=>{
            this.setState({cart:res.data})
        })
    }

    renderCart = () =>{
        return this.state.cart.map(val=>{
            return(
                <tr className='border-bottom'>
                    <td className='w-25'><img className="img-thumbnail w-25 mx-auto d-block" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt="Card image cap"/></td>
                    <td className='w-50'>{val.name}</td>
                    <td className='w-25 text-center'><b>Qty: </b>{val.quantity}</td>
                    <td style={{color:'red'}} className='text-center'><b>Rp{val.price.toLocaleString('IN')},00</b></td>
                </tr>
            )
        })
    }

    render(){
        const cart = this.state.cart
        console.log(cart)
        return(
            <div>
                <Header/>
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-md-8'>
                            <table class="table">
                                <tbody>
                                    {this.renderCart()}
                                </tbody>
                            </table>
                        </div>
                        <div className='col'>
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <div class="card-body">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart