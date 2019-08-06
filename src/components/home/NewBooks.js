import React,{Component} from 'react'

import alibaba from '../../images/products/allproducts/alibaba.jpg'
import crushingIt from '../../images/products/allproducts/crushing_it.jpg'
import hyh from '../../images/products/allproducts/hug_your_haters.jpg'
import simple from '../../images/products/allproducts/the_art_of_simple_living.jpg'
import lean from '../../images/products/allproducts/the_lean_startup.jpg'
import brand from '../../images/products/allproducts/building_a_story_brand.jpg'

class NewBooks extends Component{
  render(){
    return(
      <div>
        {/* BEST SELLER PRODUCTS */}
        <div style={{width:"30%"}} className="display-4 my-3 border-bottom">
          <h1>New Books</h1>
        </div>

        <div className="card-deck">
          <div className="card">
            <img className="card-img-top" src={alibaba} alt="Card image cap"/>
            <div style={{height:'100px'}} className="card-body">
              <h5 className="card-title">Alibaba</h5>
              <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
              <div className='text-center m-3'>
                  <button className='btn btn-outline-danger'>Add to Cart</button>
                  <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
              </div>
          </div>

          <div className="card">
            <img className="card-img-top" src={crushingIt} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">Crushing It</h5>
              <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
              <div className='text-center m-3'>
                  <button className='btn btn-outline-danger mx-1'>Add to Cart</button>
                  <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
              </div>
          </div>

          <div className="card">
            <img className="card-img-top" src={hyh} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">Hug Your Haters</h5>
              <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
              <div className='text-center m-3'>
                  <button className='btn btn-outline-danger mx-1'>Add to Cart</button>
                  <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
              </div>
          </div>

          <div className="card">
            <img className="card-img-top" src={brand} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">Building A Story Brand</h5>
              <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
              <div className='text-center m-3'>
                  <button className='btn btn-outline-danger mx-1'>Add to Cart</button>
                  <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
              </div>
          </div>

          <div className="card">
            <img className="card-img-top" src={lean} alt="Card image cap"/>
            <div className="card-body">
              <h5 className="card-title">The Lean Startup</h5>
              <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
              <div className='text-center m-3'>
                  <button className='btn btn-outline-danger mx-1'>Add to Cart</button>
                  <button className='btn btn-outline-danger'><i className="far fa-heart"></i></button>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewBooks