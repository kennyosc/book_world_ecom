import React,{Component} from 'react'

import Header from '../headers/Header'
import axios from '../../config/axios'
import Loader from '../../Loader'


class Cart extends Component{

    state={
        cart:'',
        totalOrder: ''
    }

    componentDidMount(){
        const user_id = this.props.match.params.user_id

        axios.get(`/getusercart/${user_id}`).then(res=>{
            this.setState({cart:res.data})
        })

        axios.get(`/gettotalorder/${user_id}`).then(res=>{
            console.log(res)
            if(res.data.SUM === null){
                this.setState({totalOrder:0})
            }else{
                // kalau pake sql method sum, itu hasilnya bukan sebuah array. tapi sebuah object
                this.setState({totalOrder:res.data.SUM})
            }
        })
    }

    deleteFromCart= (product_id) =>{

    }

    renderCart = () =>{
        return this.state.cart.map(val=>{
            if(this.state.totalOrder !== 0){
                return(
                    <tr className='border-bottom'>
                        <td><button style={{color:'lightgrey'}} className='btn' onClick={()=>this.deleteFromCart(val.id)}><i className="fas fa-window-close"></i></button></td>
                        <td className='w-25'><img className="img-thumbnail w-50 mx-auto d-block" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt="Card image cap"/></td>
                        <td className='w-50'>{val.name}</td>
                        <td className='w-25 text-center'><b>Qty: </b>{val.quantity}</td>
                        <td style={{color:'red',fontSize:'0.7em'}} className='text-center'><b>Rp{val.sub_total.toLocaleString('IN')},00</b></td>
                    </tr>
                )
            }else{
                return(
                    <tr className='border-bottom'>
                        <td className='text-center'>Your cart is Empty</td>
                    </tr>
                )
            }
        })
    }

    render(){
        const cart = this.state.cart
        const totalOrder = this.state.totalOrder
        console.log(cart)
        console.log(totalOrder)

        if(totalOrder === ''){
            return(
                <div>
                    <Loader/>
                </div>
            )
        }else{
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
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Order Summary</h5>
                                        Total: <p style={{color:'red'}} className="card-text"><b>Rp {totalOrder.toLocaleString('IN')},00</b></p>
                                        <button className='btn btn-block btn-primary'>Proceed to shipment</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        
    }
}

export default Cart