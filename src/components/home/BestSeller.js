import React,{Component} from 'react'

// IMPORT IMAGE FROM FOLDER
import bs1 from '../../images/products/bestsellers/product_best_seller1.jpg'
import bs2 from '../../images/products/bestsellers/product_best_seller2.jpg'
import bs3 from '../../images/products/bestsellers/product_best_seller3.jpg'

class BestSeller extends Component{
    render(){
        return(
            <div>
                {/* BEST SELLER PRODUCTS */}
                <div style={{width:"30%"}} className="display-4 my-3 border-bottom">
                    <h1>Best Sellers</h1>
                </div>

                {/*CARD FOR BEST SELLER */}
                <div className="card-group mb-5">

                        {/* FIRST CARD */}
                        <div className="card pb-4">
                            <img src={bs1} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">The Ten Types Of Human</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                            <div className='text-center'>
                                <button className='btn btn-danger w-75  '>Add to Cart</button>
                            </div>
                        </div>

                        {/* SECOND CARD */}
                        <div className="card pb-4">
                            <img src={bs2} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">The Key To Happiness</h5>
                                <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div className='text-center'>
                                <button className='btn btn-danger w-75  '>Add to Cart</button>
                            </div>
                        </div>

                        {/* THIRD CARD */}
                        <div className="card pb-4">
                            <img src={bs3} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">Everyday Millionaires</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                            </div>
                            <div className='text-center'>
                                <button className='btn btn-danger w-75  '>Add to Cart</button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default BestSeller