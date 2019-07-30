import React,{Component} from 'react'
import MainCarousel from './MainCarousel'
import BestSeller from './BestSeller'
import NewsReview from './NewsReview'
import ProductCarousel from './ProductCarousel'


class Home extends Component{
    
    componentDidMount(){
        window.scrollTo(0,0)
    }

    render(){
        return(
            <div>
                <MainCarousel/>
                <NewsReview/>
                <BestSeller/>
                <ProductCarousel/>
            </div>
        )
    }
}

export default Home