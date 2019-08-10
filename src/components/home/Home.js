import React,{Component} from 'react'
import Header from '../headers/Header.js'
import MainCarousel from './MainCarousel'
import BestSeller from './BestSeller'
import NewsReview from './NewsReview'
import NewBooks from './NewBooks'
import Footer from '../Footer'


class Home extends Component{

    render(){
        return(
            <div>
                <Header/>
                <MainCarousel/>
                <div className='container'>
                    <NewsReview/>
                    <BestSeller/>
                    <NewBooks/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Home