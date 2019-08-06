import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from '../../../config/axios.js'

import AdminHeader from '../../headers/AdminHeader'

class EditProduct extends Component{

    state={
        editProduct:[],
        categories:[],
        genres:[]
    }

    componentDidMount(){
        var product_id = this.props.match.params.product_id

        //get product categories
        axios.get('/productcategories').then(res=>{
            this.setState({categories:res.data})
        })

        //get product genres
        axios.get('/productgenres').then(res=>{
            this.setState({genres:res.data})
        })

        //get product per id for edit
        axios.get('/productcategory/' + product_id).then(res=>{
            this.setState({editProduct:res.data})
        })
    }

    renderCategories = () =>{
        var hasil = this.state.categories.map(val=>{
            return(
            <option value={val.id}>{val.category}</option>
            )
        })

        return hasil
    }

    renderGenres = () =>{
        var hasil = this.state.genres.map(val=>{
            return(
                <option value={val.id}>{val.genre}</option>
            )
        })
        return hasil
    }

    handleEditProduct = () =>{
        const product_id = this.props.match.params.product_id
        const productName = this.productName.value
        const productPrice = this.price.value
        const stock = this.stock.value
        const productDesc = this.productDescription.value
        const productCategoryId = this.category.value
        const genreId = this.genre.value
        const author = this.author.value
        const published = this.published.value
        const weight = this.weight.value
        const productImage = this.productImage.files[0]

        const formData = new FormData()
        //products
        formData.append('name',productName)
        formData.append('price',productPrice)
        formData.append('stock',stock)
        formData.append('photo',productImage)
        formData.append('weight',weight)
        formData.append('description',productDesc)
        formData.append('author',author)
        formData.append('published',published)
        
    }

    render(){
        const book = this.state.editProduct
        console.log(book)
 
        return(
            <div>
                <AdminHeader/>
                <div className='container'>
                    <div className="card my-3 mb-5">

                        <div className="card-header">
                            <ul className="nav nav-tabs card-header-tabs">
                                <li className="nav-item">
                                    <Link style={{color:'black'}} to='/admin/manageproducts'>
                                        <a className="nav-link" href="#">Manage Products</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link style={{color:'black'}} to='/admin/managecategories'>
                                        <a className="nav-link" href="#">Manage Categories</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link style={{color:'black', textDecoration:'none'}} to='/admin/addproduct'>
                                        <a className="nav-link" href="#">Add Product</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                        <a className="nav-link active" href="#">Edit Product</a>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body">
                            <h5 className="card-title">{book.name}</h5>

                            <form>
                            <div className="form-group">
                                <label for="exampleFormControlInput1">Product Name</label>
                                <input  type="email" className="form-control w-100" id="exampleFormControlInput1" defaultValue={book.name} ref={(productName) => {this.productName = productName}}/>
                                <small className="form-text text-muted mt-3">
                                    Product name must be less than 30 characters
                                </small>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4">Price</label>
                                    <input type="number" min='1' className="form-control" id="inputEmail4" placeholder='Rp' defaultValue={book.price} ref={input => this.price = input}/>
                                    <small className="form-text text-muted mt-3">
                                    Input only number
                                    {/*  <p className='card-text'>Rp{price.toLocaleString('IN')},-</p> */}
                                    </small>
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4">Stock</label>
                                    <input type="number" min='1' className="form-control" id="inputPassword4" placeholder="Min 1" defaultValue={book.stock} ref={input => this.stock = input}/>
                                    <small className="form-text text-muted mt-3">
                                    Minimum 1 product in stock
                                    </small>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Product Description</label>
                                <textarea style={{height:'150px'}} className="form-control" id="exampleFormControlTextarea1" defaultValue={book.description} ref={(input) => {this.productDescription = input}}>{book.description}</textarea>
                            </div>

                            <div className="form-row">
                                
                                <div className="form-group col-md-4">
                                    <label for="inputState">Product Category</label>
                                    <select id="inputState" className="form-control" defaultValue={book.category} ref={input => this.category = input}>
                                        <option value={book.category_id} selected>--{book.category}</option>
                                        {this.renderCategories()}
                                    </select>
                                </div>
                               

                                <div className="form-group col-md-4">
                                    <label for="inputState">Genre</label>
                                    <select id="inputState" className="form-control" defaultValue={book.genre} ref={input => this.genre = input}>
                                        <option value={book.genre_id} selected>--{book.genre}</option>
                                        {this.renderGenres()}
                                    </select>
                                </div>
                            </div>

                            <div className='form-row'>
                                <div className="form-groupcol-md-4">
                                    <label for="inputPassword4">Author</label>
                                    <input type="text" className="form-control"  placeholder="Author Name" defaultValue={book.author} ref={input => this.author = input}/>
                                </div>

                                <div className="form-group col-md-6">
                                    <label for="inputPassword4">Published</label>
                                    <input type="text" className="form-control"  placeholder="2018" defaultValue={book.published} ref={input => this.published = input}/>
                                </div> 
                            </div>
                            

                            <div className="form-group w-25">
                                <label for="inputPassword4">Weight</label>
                                <input type="number" min='1' className="form-control" id="inputPassword4" placeholder="Kg" defaultValue={book.weight} ref={input => this.weight = input}/>
                                <small className="form-text text-muted mt-3">
                                    Default weight is 1 kg
                                </small>
                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlFile1">Product Image</label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" defaultValue={book.photo} ref={input => this.productImage = input}/>
                            </div>

                            </form>                            
                            
                            <button className='btn btn-warning mt-5 btn-block' onClick={this.handleEditProduct}>Edit Product</button>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default EditProduct