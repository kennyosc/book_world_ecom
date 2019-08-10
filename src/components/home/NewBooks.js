import React,{Component} from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'

class NewBooks extends Component{

  state = {
    allProducts: []
  }

  componentDidMount(){
    axios.get('/newproducts').then(res=>{
      this.setState({allProducts:res.data})
    })
  }

  renderNewBooks = () =>{
    return this.state.allProducts.map(val=>{
      return(
        <div className="card">
            <img className="card-img-top" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt="Card image cap"/>
            <div className="card-body">
              <Link to={`/productdetails/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                <h5 className="card-title">{val.name.slice(0,30)}...</h5>
              </Link>
              <p className="card-text">{val.description.slice(0,80)}...</p>
            </div>
              <div className='text-center m-3'>
                  <button className='btn btn-outline-danger mx-1'>Add to Cart</button>
                  <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
              </div>
          </div>
      )
    })
  }

  render(){
    return(
      <div>
        {/* BEST SELLER PRODUCTS */}
        <div style={{width:"30%"}} className="display-4 my-3 border-bottom">
          <h1>New Books</h1>
        </div>

        <div className="card-deck">
          {this.renderNewBooks()}
        </div>
      </div>
    )
  }
}

export default NewBooks