import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header.js'
import axios from '../../config/axios.js';
import Loader from '../../Loader'
import ProductItem from './ProductItem'



class AllProducts extends Component{

    state={
        products:'',
        searchProduct: [],
        genres:[],
        unit:0
    }

    componentDidMount(){
        axios.get(`/allproducts`).then(res=>{
            this.setState({products: res.data, searchProduct:res.data})
        })


        //get product genres
        axios.get('/productgenres').then(res=>{
            this.setState({genres:res.data})
        })
    }

    handleSearch = () =>{
        const name = this.name.value.toLowerCase()
        const min = parseInt(this.min.value)
        const max = parseInt(this.max.value)

        var arrSearch = this.state.searchProduct.filter((val)=>{
            if(isNaN(min) && isNaN(max)){ // Search by Name
                return (
                    val.name.toLowerCase().includes(name.toLowerCase())
                )
            }else if (isNaN(min)){ // Name and Max
                return (
                    val.name.toLowerCase().includes(name.toLowerCase())
                    &&
                    val.price <= max
                )
            } else if (isNaN(max)){ // serach Name and min
                return(
                    val.name.toLowerCase().includes(name.toLowerCase())
                    &&
                    val.price >= min
                )
            } else{ //search all . semua string itu mengandung string kosong
                return(
                    val.name.toLowerCase().includes(name.toLowerCase())
                    &&
                    val.price >= min
                    &&
                    val.price <= max
                )
            }
        })

        this.setState({products: arrSearch})
    }

    handleSearchGenre = () =>{
        const genre = parseInt(this.genre.value)

        var arrSearch = this.state.searchProduct.filter(val=>{
            if(genre === 0){
                return val
            }else{
                return(
                    val.genre_id === genre
                )
            }
        })

        this.setState({products: arrSearch})
    }

    renderGenres = () =>{
        var hasil = this.state.genres.map(val=>{
            return(
                <option value={val.id}>{val.genre}</option>
            )
        })
        return hasil
    }

    renderItem = () =>{
        if(this.state.products === ''){
            return(
                <div>
                    <Loader/>
                </div>
            )
        }else{
            return this.state.products.map(val=>{
                return(
                    <ProductItem val={val}/>
                )
            })
        }
    }

    render(){
        console.log(this.state.unit)
        return(
            <div>
                <Header/>
                <div className='container'>
                    <div className="row">
                                <div className="col-sm-12 col-lg-3 position-sticky">
                                    <div className="mt-4">
                                        <div className="mx-auto card">
                                            <div className="card-body">
                                                <div className="border-bottom border-secondary card-title">
                                                    <h1>Search</h1>
                                                </div>
                                                <div className="card-title mt-1">
                                                    <h4>Name</h4>
                                                </div>
                                                <form className="input-group"><input placeholder='Name'  ref={input => this.name = input} onChange={this.handleSearch}className="form-control" type="text"/></form>
                                                <div className="card-title mt-4">
                                                    <h4>Price</h4>
                                                </div>
                                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} onChange={this.handleSearch} className="form-control mb-2" type="text" /></form>
                                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} onChange={this.handleSearch} className="form-control" type="text" /></form>

                                                <div className="card-title mt-4">
                                                    <h4>Genre</h4>
                                                </div>
                                                <select onChange={this.handleSearchGenre} ref={(input)=>this.genre =input} class="form-control">
                                                    <option selected value='0'>All</option>
                                                    {this.renderGenres()}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div className='row col-sm-12 col-md-6 col-lg-9'>
                                {this.renderItem()}
                            </div>
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