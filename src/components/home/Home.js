import React,{Component} from 'react'
import MainCarousel from './MainCarousel';

import KompasLogo from '../../images/home/logo/logo_kompas.png'
import DetikLogo from '../../images/home/logo/logo_detik.png'
import DsLogo from '../../images/home/logo/logo_ds.png'
import TcLogo from '../../images/home/logo/logo_tc.png'
import TiaLogo from '../../images/home/logo/logo_techinasia.png'

class Home extends Component{
    render(){
        return(
            <div>
                <MainCarousel/>

                <div className='row my-4 justify-content-center'>
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
                
            </div>
        )
    }
}

export default Home