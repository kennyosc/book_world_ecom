import React,{Component} from 'react'
import axios from '../../config/axios'

import Header from '../headers/Header.js'

class ProductDetails extends Component{

    state={
        product:[]
    }

    componentDidMount(){
        var product_id = this.props.match.params.product_id

        axios.get('/productdetails/'+product_id).then(res=>{
            this.setState({product:res.data})
        })
    }

    render(){
        const product = this.state.product
        console.log(product)

        return(
            <div>
                 <Header/>
                 <div className='container'>
                     <div className='row my-5'>
                         <div className='col-md-5'>
                            <img className='img-thumbnail' src={`http://localhost:2019/geteditproductimage/${product.photo}`}/>
                         </div>
                         <div className='col ml-0'>
                             <div className='mb-4'>
                                <h3>{product.name}</h3>
                             </div>

                            <div className='mb-5'>
                                <p>{product.description}</p>
                            </div>

                            <div>
                                <h5>Rp{product.price},00</h5>
                                <p><b>Stock: </b>{product.stock}</p>
                                <button className='btn btn-outline-danger mr-1'>Add to Cart</button>
                                <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
                            </div>
                         </div>

                     </div>
                    
                 </div>
            </div>
        )
    }
}

export default ProductDetails