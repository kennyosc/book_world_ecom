import React,{Component} from 'react'
import MainCarousel from './MainCarousel'
import BestSeller from './BestSeller'

import KompasLogo from '../../images/home/logo/logo_kompas.png'
import DetikLogo from '../../images/home/logo/logo_detik.png'
import DsLogo from '../../images/home/logo/logo_ds.png'
import TcLogo from '../../images/home/logo/logo_tc.png'
import TiaLogo from '../../images/home/logo/logo_techinasia.png'

class Home extends Component{
    render(){
        return(
            <div>
                {/* MAIN HOME CAROUSEL */}
                <MainCarousel/>

                <div style={{backgroundColor:'#f5f5f5'}}>
                    {/* NEWS REVIEWS */}
                    <div className='row justify-content-center'>
                        <div className='col-lg-2 col-sm-5 col-xs-2 p-3'>
                            <img src={KompasLogo} className="img-fluid greyscale" alt="Kompas Logo"/>
                        </div>
                        <div className='col-lg-2 col-sm-5 col-xs-2 mx-4 p-3'>
                            <img src={DetikLogo} className="img-fluid greyscale" alt="Kompas Logo"/>
                        </div>
                        <div className='col-lg-2 col-sm-5 col-xs-2 p-3'>
                            <img src={DsLogo} className="img-fluid greyscale" alt="Kompas Logo"/>
                        </div>
                        <div className='col-lg-2 col-sm-5 col-xs-2 mx-4 p-3'>
                            <img src={TcLogo} className="img-fluid greyscale" alt="Kompas Logo"/>
                        </div>
                        <div className='col-lg-2 col-sm-5 col-xs-2 p-3'>
                            <img src={TiaLogo} className="img-fluid greyscale" alt="Kompas Logo"/>
                        </div>
                    </div>

                    {/* QUOTE REVIEWS */}
                    <blockquote className="blockquote text-center">
                        <p className="mb-0">The best place to find and buy books in Indonesia</p>
                        <footer className="blockquote-footer">Willis Wee,<cite title="Source Title">Founder of Tech In Asia</cite></footer>
                    </blockquote>
                </div>
                
                {/* BEST SELLER PRODUCTS */}
                <div style={{width:"30%"}} className="display-4 my-3 border-bottom">
                    <h1>Best Sellers</h1>
                </div>

                <BestSeller/>
                
            </div>
        )
    }
}

export default Home