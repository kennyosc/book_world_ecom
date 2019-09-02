import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

// IMPORT IMAGE FROM FOLDER
// import bs1 from '../../images/products/bestsellers/product_best_seller1.jpg'
// import bs2 from '../../images/products/bestsellers/product_best_seller2.jpg'
// import bs3 from '../../images/products/bestsellers/product_best_seller3.jpg'
import axios from '../../config/axios'
import {onAddToCart} from '../../actions/index'

class BestSeller extends Component{

    state={
        bestSellers:[]
    }

    componentDidMount(){
        axios.get(`/bestsellers`).then(res=>{
            console.log(res)
            if(res.data.length === 3){
                this.setState({bestSellers: res.data})
            }else{
                axios.get(`/bestseller2`).then(res=>{
                    this.setState({bestSellers: res.data})
                })
            }
        })
    }

    handleAddToCart = (product_id , product_price) =>{
        const user_id = this.props.user.id
        const first_name = this.props.user.first_name
        const last_name = this.props.user.last_name
        const price = parseInt(product_price)
        const phone_number = this.props.user.phone_number
    
        const quantity = 1
        const sub_total = quantity * price
    
        console.log(quantity)
        onAddToCart(user_id,first_name,last_name,phone_number,product_id,quantity,sub_total)
        
    }

    renderButton = (product_id,product_price) =>{
        if(this.props.user.id === ''){
            return(
                <Link to='/login'>
                    <button className='btn btn-danger btn-block mr-1'>Add to Cart</button>
                </Link>
            )
        }else{
            return(
                <div>
                    <button onClick={()=>this.handleAddToCart(product_id,product_price)} className='btn btn-danger btn-block  mr-1'>Add to Cart</button>
                </div>   
            )
        }
    }

    renderBestSellers=()=>{
        return this.state.bestSellers.map(val=>{
            return(
                <div className="card p-4 ">
                    <div>
                        <img style={{marginLeft:'10%'}} className="card-img-top w-75" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt="Card image cap"/>
                    </div>
                    <div className="card-body">
                    <Link to={`/productdetails/${val.product_id}`} style={{textDecoration:'none', color:'black'}}>
                        <h5 className="card-title">{val.name.slice(0,30)}...</h5>
                    </Link>
                        <p className="card-text">{val.description.slice(0,80)}...</p>
                    </div>
                    <div className='text-center'>
                        {this.renderButton(val.id,val.price)}
                    </div>
                </div>
            )
        })
    }

    render(){
        console.log(this.state.bestSellers)
        if(this.state.bestSellers.length !== 0){
            return(
                <div>
                    {/* BEST SELLER PRODUCTS */}
                    <div style={{width:"30%"}} className="display-4 my-3 border-bottom">
                        <h1>Best Sellers</h1>
                    </div>
    
                    {/*CARD FOR BEST SELLER */}
                    <div className="card-group mb-5">
                            {/* FIRST CARD */}
                            {this.renderBestSellers()}
                        </div>
                </div>
            )
        }else{
            return(
                <div>
                    {/* BEST SELLER PRODUCTS */}
                    <div style={{width:"30%"}} className="display-4 my-3 border-bottom">
                        <h1>Best Sellers</h1>
                    </div>
                    
                    <div class="spinner-border text-secondary" role="status">
                        <span class="sr-only">Loading...</span>
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

export default connect(mapStateToProps)(BestSeller)