import React,{Component} from 'react'

import bs1 from '../../images/products/product_best_seller1.jpg'
import bs2 from '../../images/products/product_best_seller2.jpg'
import bs3 from '../../images/products/product_best_seller3.jpg'

class BestSeller extends Component{
    render(){
        return(
            <div class="card-group mb-5">
                    <div class="card pb-4">
                        <img src={bs1} class="card-img-top" alt="..."/>
                        <div class="card-body">
                        <h5 class="card-title">The Ten Types Of Human</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-outline-danger w-50'>Add to Cart</button>
                        </div>
                    </div>
                    <div class="card pb-4">
                        <img src={bs2} class="card-img-top" alt="..."/>
                        <div class="card-body">
                        <h5 class="card-title">The Key To Happiness</h5>
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-outline-danger w-50'>Add to Cart</button>
                        </div>
                    </div>
                    <div class="card pb-4">
                        <img src={bs3} class="card-img-top" alt="..."/>
                        <div class="card-body">
                        <h5 class="card-title">Everyday Millionaires</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-outline-danger w-50'>Add to Cart</button>
                        </div>
                    </div>
                </div>
        )
    }
}

export default BestSeller