import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {onAddToCart} from '../../actions/index'

class ProductItem extends Component{

    state={
        unit:0
    }

    handleAddToCart = (product_id , product_price) =>{
        const user_id = this.props.user.id
        const first_name = this.props.user.first_name
        const last_name = this.props.user.last_name
        const price = parseInt(product_price)
        const phone_number = this.props.user.phone_number

        const quantity = parseInt(this.state.unit)
        const sub_total = quantity * price

        onAddToCart(user_id,first_name,last_name,phone_number,product_id,quantity,sub_total)
    }

    render(){
        let val = this.props.val

        if(this.props.user.id === ''){
            return(
                <div className="card col-3 mt-5 mx-3">
                    <img className="card-img-top" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt="Card image cap"/>
                    <div className="card-body">
                        <Link to={`/productdetails/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                            <h5 style={{fontSize:'1em'}} className="card-title">{val.name.slice(0,40)}...</h5>
                        </Link>
                        <p>Rp{val.price.toLocaleString('IN')},00</p>
                        <p><b>stock: </b>{val.stock}</p>
                        <form>
                            <input className='form-control' placeholder='Qty' type='number' min='1' onChange={this.handleChange}/>    
                        </form>
                    </div>
                    <div className='text-center mb-3'>
                    <Link to='/login'>
                        <button className='btn btn-danger btn-block mr-1'>Add to Cart</button>
                    </Link>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="card col-3 mt-5 mx-3">
                    <img className="card-img-top" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt="Card image cap"/>
                    <div className="card-body">
                        <Link to={`/productdetails/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                            <h5 style={{fontSize:'1em'}} className="card-title">{val.name.slice(0,40)}...</h5>
                        </Link>
                        <p>Rp{val.price.toLocaleString('IN')},00</p>
                        <p><b>stock: </b>{val.stock}</p>
                        <form>
                            <input className='form-control' placeholder='Qty' type='number' min='1' onChange={(event)=>{this.setState({unit:event.target.value})}}/>    
                        </form>
                    </div>
                    <div className='text-center mb-3'>
                        <div>
                            <button onClick={()=>this.handleAddToCart(val.id, val.price)} className='btn btn-danger btn-block  mr-1'>Add to Cart</button>
                        </div>   
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
      user:state.auth
    }
  }


export default connect(mapStateToProps)(ProductItem)