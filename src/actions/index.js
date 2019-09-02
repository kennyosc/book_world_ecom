import axios from '../config/axios.js'
import Swal from 'sweetalert2'
import cookies from 'universal-cookie'

const cookie = new cookies()

// ============================USER=================================

// REGISTER BUTTON
export const registerButton = (firstName,lastName,username,email,gender,phoneNumber,password, passwordConfirmation) =>{
    if(password === passwordConfirmation){
        axios.post('/register',
            {
                first_name : firstName,
                last_name: lastName,
                username: username,
                email: email,
                gender: gender,
                phone_number: phoneNumber,
                password : password
            }
        ).then(res=>{
            if(typeof(res.data) == 'string'){
                console.log(res)
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: res.data
                  })
            }else{
                  Swal.fire(
                    'Register Success!',
                    'Please wait for the admin to verify your email in 1 or 2 days!',
                    'success'
                  )
            }
        })
    } else{
        Swal.fire({
            type: 'error',
            title: 'Password does not match',
            text: 'Please match password field'
          })
    }
    
}

// LOGIN BUTTON
export const loginButton = (email, password,remember_me) =>{
    return(dispatch) =>{
        axios.post('/login',
            {
                email: email,
                password: password
            }
        ).then(res=>{
            if(res.data.suspended === 1){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: "You're account has been suspended. Please contact our customer support for more information"
                  })
            }else{
                if(typeof(res.data) == 'string'){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: res.data
                      })
                }else{
                    
                    const {id,first_name, last_name,username,email,gender,phone_number,avatar,verified} = res.data
                    if(verified === 1){
                        dispatch({
                            type:'LOGIN_SUCCESS',
                            payload:{
                                id: id,
                                first_name: first_name,
                                last_name: last_name,
                                username: username,
                                email: email,
                                gender: gender,
                                phone_number: phone_number,
                                avatar: avatar,
                                verified: verified
                            }
                        })
                        
                        if(remember_me === true){
                            //CREATE COOKIE DATA
                            cookie.set('user', {id,first_name,last_name,username,email,gender,phone_number,avatar,verified} , {path:'/'})
                        }
                        
                        Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Login Success!',
                            showConfirmButton: false,
                            timer: 1500
                          })
    
                    }else{
                        Swal.fire({
                            type: 'error',
                            title: 'Email verification required',
                            text: 'Please verify your email first'
                          })
                    }
                   
                }
            }
        })
    }
}

// LOGOUT BUTTON
export const logoutButton = () =>{
    cookie.remove('user')
    return {
        type:'LOGOUT_SUCCESS'
    }
}

//KEEP LOGIN FUNCTION
export const keepLogin = (objCookie) =>{
    return{
        type:'LOGIN_SUCCESS',
        payload:{
            id: objCookie.id,
            first_name: objCookie.first_name,
            last_name: objCookie.last_name,
            username: objCookie.username,
            email: objCookie.email,
            gender:objCookie.gender,
            phone_number:objCookie.phone_number,
            avatar: objCookie.avatar,
            verified: objCookie.verified
        }
    }
}

//UDPATE PROFILE BUTTON
export const onUpdateProfile = (id,firstName,lastName,email,gender,phoneNumber) =>{
    return (dispatch) =>{
            axios.patch(`/updateprofile/${id}`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    gender:gender,
                    phone_number : phoneNumber
                }
            ).then(res=>{
                if(typeof(res.data) === 'string'){
                    console.log(res.data)
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: res.data
                      })
                }else if(res.data.sqlMessage){
                    console.log(res.data)
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Email already used, please try a different email'
                      })
                }else{
                const {id,first_name, last_name,username,email,gender,phone_number,avatar,verified} = res.data
                console.log(res)
    
                dispatch({
                    type:'PROFILE_UPDATE_SUCCESS',
                    payload:{
                        id: id,
                        first_name: first_name,
                        last_name: last_name,
                        username: username,
                        email: email,
                        gender:gender,
                        phone_number: phone_number,
                        avatar: avatar,
                        verified: verified
                    }
                })

                cookie.set('user', {id,first_name,last_name,username,email,gender,phone_number,avatar,verified} , {path:'/'})

                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Profile updated',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
            })
    }
}

//UPDATE/POST AVATAR TO USER
export const onUpdateAvatar = (id,avatar, objUser) =>{
    return(dispatch)=>{
        const formData = new FormData()
        formData.append('avatar',avatar)

        axios.patch(`/updateavatar/${id}`,formData).then(res=>{
            if(typeof(res.data)==='number'){
                console.log(res)
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: res.data
                  })
            }else if(res.data.sqlMessage){
                console.log(res)
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: res.data
                  })
            }else{
                const {id,first_name, last_name,username,email,gender,phone_number, verified} = objUser
                
                console.log(res.data)   
                dispatch({
                    type:'PROFILE_PICTURE_UPLOADED',
                    payload:{
                        avatar: res.data
                    }
                })

                cookie.set('user', {id,first_name,last_name,username,email,gender,phone_number, avatar:res.data, verified} , {path:'/'})

                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Profile Picture Uploaded!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
}

//CHANGE USER PASSWORD
export const onChangePassword = (id,oldPassword,newPassword,newPasswordConfirmation) =>{
    return(dispatch)=>{
        if(newPassword === newPasswordConfirmation){
            if(newPassword.length < 8){
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'New password be minimum 8 characters'
                    })
            }else{
                if(oldPassword !== newPassword){
                    axios.patch(`/updatepassword/${id}`,
                        {
                            oldPassword,
                            newPassword
                        }
                    ).then(res=>{
                        if(res.data.sqlMessage){
                            Swal.fire({
                                type: 'error',
                                title: 'New password does not match',
                                text: res.data.sqlMessage
                                })
                        }else{
                            console.log(res)
                            Swal.fire({
                                    position: 'center',
                                    type: 'success',
                                    title: 'Password Updated!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                        }
                    })
                }else{
                    Swal.fire({
                    type: 'error',
                    title: 'Password must not be the same',
                    text: 'Please change your password'
                    })
                }
            }
        }else{
            Swal.fire({
                type: 'error',
                title: 'New password does not match',
                text: 'Please match your new password'
                })
        }
    }
}

// ============================ADMIN==================================
//ADMIN LOGIN ROUTE
export const onAdminLogin = (username,password) =>{
    return(dispatch)=>{
        if(username === '' || password === ''){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Please insert your username and password'
              })
        }else{
            axios.post('/admin/login',
                {
                    username,
                    password
                }
            ).then(res=>{
                if(typeof(res.data) === 'string'){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: res.data
                      })
                }else{
                    console.log(res)
                    const {id,username,email} = res.data
                    dispatch({
                        type:'ADMIN_LOGIN_SUCCESS',
                        payload:{
                            id,
                            username,
                            email
                        }
                    })

                    cookie.set('admin',{id,username,email}, {path:'/'})

                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Login Success!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }
    }
}

export const onAdminLogout = () =>{
    Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Admin Logged Out!',
        showConfirmButton: false,
        timer: 1500
    })
    cookie.remove('admin')
    return{
        type:'ADMIN_LOGOUT_SUCCESS'
    }
}

export const keepLogin_admin = (objCookie_admin) =>{
    return{
        type:'ADMIN_LOGIN_SUCCESS',
        payload:{
            id: objCookie_admin.id,
            username: objCookie_admin.username,
            email: objCookie_admin.email
        }
    }
}

export const onAddProduct = (productName,productPrice,stock,productDesc,productCategoryId,genreId,author,published, weight,productImage) =>{

    const formData = new FormData()
        //products
        formData.append('name',productName)
        formData.append('price',productPrice)
        formData.append('stock',stock)
        formData.append('productImage',productImage)
        formData.append('weight',weight)
        formData.append('description',productDesc)
        formData.append('author',author)
        formData.append('published',published)
        //product_categories
        formData.append('category_id',productCategoryId)
        formData.append('genre_id',genreId)

        /*
        1. product name < 30 char
        2. price is only number
        3. stock > 0
        4. description, category, genre, author, published, weight and productImage cannot be empty
        */

        console.log(productImage)

        if(productName === '' || productPrice === '' || stock === '' || productDesc === '' || productCategoryId === '' || genreId === '' || author === '' || published === '' || weight === '' || productImage === undefined){
            Swal.fire({
                type: 'error',
                title: 'Insert product failed',
                text: 'Please insert all fields'
              })
        }else if(productName.length > 60){
            Swal.fire({
                type: 'error',
                title: 'Product Name Error',
                text: 'Product Name must be less than 60 characters'
              })
        }else if(isNaN(productPrice) || isNaN(stock) || isNaN(weight) || isNaN(published)){
            Swal.fire({
                type: 'error',
                title: 'Product Name Error',
                text: 'Product price, stock, weight and published must be a number'
              })
        }else if(stock < 0){
            Swal.fire({
                type: 'error',
                title: 'Product Name Error',
                text: 'Stock must be more than 0'
              })
        }else if(weight < 0){
            Swal.fire({
                type: 'error',
                title: 'Product Name Error',
                text: 'Weight must be more than 0'
              })
        }else if(!isNaN(author)){
            Swal.fire({
                type: 'error',
                title: 'Product Name Error',
                text: 'Author must be a string'
              })
        }else if(published < 1901 || published > 2155){
            Swal.fire({
                type: 'error',
                title: 'Product Name Error',
                text: 'Published must be between 1901 and 2155'
              })
        }else{
            axios.post('/addproduct',formData).then(res=>{
                if(res.data.affectedRows){
                    console.log(res)
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Product Added!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
}

// ============================ADD TO CART=================================
export const onAddToCart = (user_id,first_name,last_name,phone_number,product_id,quantity,sub_total) =>{

    if(quantity === 0 || isNaN(quantity)){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Please insert quantity'
          })
    }else if(quantity < 0){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Quantity must be more than 0'
          })
    }else{
        axios.post('/handleaddtocart',
                {
                    user_id,
                    first_name,
                    last_name,
                    phone_number,
                    product_id,
                    quantity,
                    sub_total
                }
            ).then(res=>{
                if(typeof(res.data) === 'string'){
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: res.data
                      })
                }else{
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Added to cart!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
    }
}

export const deleteFromCart= async(user_id,product_id) =>{
    try{
        const res = await axios.delete(`/deletefromcart/${user_id}/${product_id}`)
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const addCoupon = async(user_id,coupon_code,totalOrder) =>{
    try {
        const res = await axios.post('/usecoupon',{user_id,coupon_code,totalOrder})
        return res.data
    } catch (err) {
        console.log(err)
    }
}

export const removeCoupon = async(user_id,coupon_id) =>{
    try{
        const res = await axios.delete(`/deleteusecoupon/${coupon_id}/${user_id}`)
        return res.data
    }catch(err){
        console.log(err)
    }
}

// ============================WISHLIST=================================

export const onAddToWishlist = async(user_id,product_id) =>{
   var res = await axios.post('/addwishlist',{user_id,product_id})

   return res.data
}

export const onRemoveFromWishlist = async(user_id,product_id) =>{
    var res = await axios.delete(`/deletewishlist/${user_id}/${product_id}`)

    return res.data
}

