import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Header from '../headers/Header.js'
import axios from '../../config/axios.js';
import Loader from '../../Loader'


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
        axios.get(`/search/${query}`).then(res=>{
            this.setState({searchProducts: res.data})
        })
    }

    renderButton = () =>{
        if(this.props.user.id === ''){
            return(
                <Link to='/login'>
                    <button className='btn btn-danger btn-block mr-1'>Add to Cart</button>
                </Link>
            )
        }else{
            return(
                <div>
                    <button className='btn btn-danger btn-block  mr-1'>Add to Cart</button>
                </div>   
            )
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
                    <div className="card col-3 mt-5 mx-3">
                        <img className="card-img-top" src={`http://localhost:2019/geteditproductimage/${val.photo}`} alt="Card image cap"/>
                        <div className="card-body">
                            <Link to={`/productdetails/${val.id}`} style={{textDecoration:'none', color:'black'}}>
                                <h5 style={{fontSize:'1em'}} className="card-title">{val.name.slice(0,40)}...</h5>
                            </Link>
                            <p>Rp{val.price.toLocaleString('IN')},00</p>
                            <form>
                                <input className='form-control' placeholder='Qty' type='number' min='1' onChange={this.handleChange}/>    
                            </form>
                        </div>
                        <div className='text-center mb-3'>
                            {this.renderButton()}
                        </div>
                    </div>
                )
            })
        }
    }

    render(){
        return(
            <div>
                <Header handleSearch={(query)=>{this.handleSearch(query)}} searchProducts={this.state.searchProducts}/>
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
                                                <form className="input-group"><input placeholder='Name'ref={input => this.name = input} className="form-control" type="text"/></form>
                                                <div className="card-title mt-1">
                                                    <h4>Price</h4>
                                                </div>
                                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                                            </div>
                                        </div>

                                        <div class="card my-3">
                                            <div class="card-header">
                                                <b>Categories</b>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Fantasy</li>
                                                <li class="list-group-item">Non-Fiction</li>
                                                <li class="list-group-item">Fiction</li>
                                            </ul>
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