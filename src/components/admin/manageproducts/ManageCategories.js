import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Link,Redirect} from 'react-router-dom'
import axios from '../../../config/axios.js'

import AdminHeader from '../../headers/AdminHeader'

class ManageCategories extends Component{

    state={
        categories:[],
        genres:[],
        selectedCategory:0,
        selectedGenre:0,
    }

    componentDidMount(){
        //get product categories
        axios.get('/productcategories').then(res=>{
            this.setState({categories:res.data})
        })

        //get product genres
        axios.get('/productgenres').then(res=>{
            this.setState({genres:res.data})
        })
    }

    renderAll = () =>{
        //get product categories
        axios.get('/productcategories').then(res=>{
            this.setState({categories:res.data})
        })

        //get product genres
        axios.get('/productgenres').then(res=>{
            this.setState({genres:res.data})
        })
    }

    handleDeleteCategory = (id) =>{
        axios.delete(`/deletecategory/${id}`).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    handleDeleteGenre = (id) =>{
        axios.delete(`/deletegenre/${id}`).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    handleSaveCategory = (category_id) =>{
        const category = this.editcategory.value

        axios.patch('/saveeditedcategory',{category, id:category_id}).then(res=>{
            if(res.data.affectedRows){
                console.log(res)
                this.renderAll()
                this.setState({selectedCategory:0})
            }
        })
    }

    handleSaveGenre = (genre_id) =>{
        const genre = this.editgenre.value
        axios.patch('/saveeditedgenre',{genre, id: genre_id}).then(res=>{
            if(res.data.affectedRows){
                console.log(res)
                this.renderAll()
                this.setState({selectedGenre:0})
            }
        })
    }

    renderCategories = () =>{
        return this.state.categories.map((val,index)=>{
            if(this.state.selectedCategory !== val.id){
                return(
                    <tr>
                        <th className='border-right'scope="row">{index+1}</th>
                        <td>{val.category}</td>
                        <td>
                            <button className='btn btn-outline-success btn-sm mx-2' onClick={()=>this.setState({selectedCategory: val.id})}>Edit</button>
                            <button onClick={()=>this.handleDeleteCategory(val.id)} className='btn btn-outline-danger btn-sm'>Delete</button>
                        </td>
                    </tr>
                    
                )
            }else{
                return(
                    <tr>
                        <th className='border-right'scope="row">{index+1}</th>
                        <td><input ref={(input)=>this.editcategory=input} className='form-control' defaultValue={val.category}/></td>
                        <td>
                            <button onClick={()=>{this.handleSaveCategory(val.id)}} className='btn btn-success btn-sm mx-2'>Save</button>
                            <button onClick={()=>this.setState({selectedCategory:0})} className='btn btn-warning btn-sm'>cancel</button>
                        </td>
                    </tr>
                    
                )
            }
        })
    }

    renderGenres = () =>{
        return this.state.genres.map((val,index)=>{
            if(this.state.selectedGenre !== val.id){
                return(
                    <tr>
                        <th className='border-right'scope="row">{index+1}</th>
                        <td>{val.genre}</td>
                        <td>
                            <button className='btn btn-outline-success btn-sm mx-2' onClick={()=>{this.setState({selectedGenre:val.id})}}>Edit</button>
                            <button onClick={()=>this.handleDeleteGenre(val.id)} className='btn btn-outline-danger btn-sm'>Delete</button>
                        </td>
                    </tr>
                )
            }else{
                return(
                    <tr>
                        <th className='border-right'scope="row">{index+1}</th>
                        <td><input  ref={(input)=>this.editgenre=input} className='form-control' defaultValue={val.genre}/></td>
                        <td>
                            <button onClick={()=>{this.handleSaveGenre(val.id)}} className='btn btn-success btn-sm mx-2'>Save</button>
                            <button onClick={()=>this.setState({selectedGenre:0})} className='btn btn-warning btn-sm'>cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    handleNewCategory = (event) =>{
        event.preventDefault()
        const category = this.category.value

        axios.post('/addcategory',{category}).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    handleNewGenre = (event) =>{
        event.preventDefault()
        const genre = this.genre.value

        axios.post('/addgenre',{genre}).then(res=>{
            console.log(res)
            this.renderAll()
        })
    }

    render(){

        if(this.props.admin.id === ''){
            return(
                <Redirect to ='/login-admin'/>
            )
        }else{
            return(
                <div>
                    <AdminHeader/>
                    <div className='container'>
                        <div class="card text-center mt-3">
    
                            <div class="card-header">
                                <ul class="nav nav-tabs card-header-tabs">
                                    <li class="nav-item">
                                        <Link style={{color:'black'}} to='/admin/manageproducts'>
                                            <a class="nav-link" href="#">Manage Products</a>
                                        </Link>
                                    </li>
    
                                    <li class="nav-item">
                                        <Link style={{color:'black', textDecoration:'none'}} to='/admin/managecategories'>
                                            <a class="nav-link active" href="#">Manage Categories</a>
                                        </Link>
                                    </li>
    
                                    <li class="nav-item">
                                        <Link style={{color:'black'}} to='/admin/addproduct'>
                                            <a class="nav-link" href="#">Add Product</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
    
                            <div class="card-body">
                                {/* INPUT NEW CATEGORY AND GENRE */}
                                <h5 className="card-title">Add New</h5>
    
                                <div style={{marginLeft:'30%'}} className='mb-5'>
                                    <form class="form-inline">
                                        <div class="form-group mx-sm-3 mb-2">
                                            <input ref={input=>this.category=input} type="text" class="form-control" placeholder='Insert New Category'/>
                                        </div>
                                        <button class="btn btn-primary mb-2 display-inline" onClick={this.handleNewCategory}>Add Category</button>
                                    </form>
    
                                    <form class="form-inline">
                                        <div class="form-group mx-sm-3 mb-2">
                                            <input ref={input=>this.genre=input} type="text" class="form-control" placeholder="Insert New Genre"/>
                                        </div>
                                        <button class="btn btn-primary mb-2" onClick={this.handleNewGenre}>Add Genre</button>
                                    </form>
                                </div>
                                
    
                                <div className='row'>
                                    <div className='col-sm-12 col-md-6'>
                                        <h5 className="card-title">Categories</h5>
    
                                            <div className='table-responsive'>
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                        <th scope="col">Id</th>
                                                        <th className='w-50' scope="col">Category Name</th>
                                                        <th className='w-100' scope="col">Edit / Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderCategories()}
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                    </div>
    
                                    <div className='col-sm-12 col-md-6'>
                                        <h5 className="card-title">Genres</h5>
    
                                        <table class="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th className='w-50' scope="col">Genre Name</th>
                                            <th className='w-100' scope="col">Edit / Delete</th>
    
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderGenres()}
                                            
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) =>{
    return{
        admin : state.admin_auth
    }
}

export default connect(mapStateToProps)(ManageCategories)