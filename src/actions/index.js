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
                    'A verification email has been sent to your email!',
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
export const onUpdateProfile = (id,firstName,lastName,username,email,gender,phoneNumber) =>{
    return (dispatch) =>{
        axios.patch(`/updateprofile/${id}`,
            {
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                gender:gender,
                phone_number : phoneNumber
            }
        ).then(res=>{
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
            if(oldPassword !== newPassword){
                axios.patch(`/updatepassword/${id}`,
                    {
                        oldPassword,
                        newPassword
                    }
                ).then(res=>{
                    console.log(res)
                    Swal.fire({
                            position: 'center',
                            type: 'success',
                            title: 'Password Updated!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                })
            }else{
                Swal.fire({
                type: 'error',
                title: 'Password must not be the same',
                text: 'Please change your password'
                })
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

// ============================ADMIN=================================
//ADMIN LOGIN ROUTE
export const onAdminLogin = (username,password) =>{
    return(dispatch)=>{
        axios.post('/admin/login',
            {
                username,
                password
            }
        ).then(res=>{
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
            Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Login Success!',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
}

// ============================ADD TO CART=================================
export const onAddToCart = (user_id,first_name,last_name,phone_number,product_id,quantity,sub_total) =>{

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

export const deleteFromCart= async(user_id,product_id) =>{
    try{
        const res = await axios.delete(`/deletefromcart/${user_id}/${product_id}`)
        return res.data
    }catch(err){
        console.log(err)
    }
}

export const addCoupon = async(user_id,coupon_code) =>{
    try {
        const res = await axios.post('/usecoupon',{user_id,coupon_code})
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

export const onAddToWishlist = (user_id,product_id) =>{
    axios.post('/addwishlist',{user_id,product_id}).then(res=>{
        console.log(res)
    })
}

export const onRemoveFromWishlist = (user_id,product_id) =>{
    axios.delete(`/deletewishlist/${user_id}/${product_id}`).then(res=>{
        console.log(res)
    })
}

