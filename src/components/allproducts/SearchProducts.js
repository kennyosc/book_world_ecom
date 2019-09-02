import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header.js'
import axios from '../../config/axios.js';
import Loader from '../../Loader'
import ProductItem from './ProductItem'


class AllProducts extends Component{

    state={
        searchProducts:''
    }

    componentDidMount(){
        axios.get(`/search/${this.props.match.params.search}`).then(res=>{
            this.setState({searchProducts: res.data})
        })
    }

    handleSearch = (query) =>{
        if(query === ''){
            axios.get('allproducts').then(res=>{
                this.setState({searchProducts:res.data})
            })
        }else{
            axios.get(`/search/${query}`).then(res=>{
                this.setState({searchProducts: res.data})
            })
        }
    }

    renderItem = () =>{
        if(this.state.searchProducts === ''){
            return(
                <div>
                    <Loader/>
                </div>
            )
        }else{
            return this.state.searchProducts.map(val=>{
                return(
                    <ProductItem val={val}/>
                )
            })
        }
    }

    render(){
        return(
            <div>
                <Header handleSearch={(query)=>{this.handleSearch(query)}} searchProducts={this.state.searchProducts}/>
                <div className='container'>
                    <div className='row  justify-content-md-center col'>
                        {this.renderItem()}
                    </div>
                    <div className='row justify-content-md-center my-5'>
                        <Link to='/allproduct'>
                            <button className='btn btn-primary btn-block'>See more products</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
      user:state.auth
    }
  }

export default connect(mapStateToProps)(AllProducts)