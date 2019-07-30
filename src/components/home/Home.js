import React,{Component} from 'react'
import MainCarousel from './MainCarousel'
import BestSeller from './BestSeller'
import NewsReview from './NewsReview'
import NewBooks from './NewBooks'


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
                <NewBooks/>
            </div>
        )
    }
}

export default Home