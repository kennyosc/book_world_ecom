import axios from '../config/axios.js'
import Swal from 'sweetalert2'
import cookies from 'universal-cookie'

const cookie = new cookies()

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
                  Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Register Success!',
                    showConfirmButton: false,
                    timer: 1500
                  })
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
                const {id,first_name, last_name,username,email,gender,phone_number,avatar} = res.data

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
                        avatar: avatar
                    }
                })
                
                if(remember_me === true){
                    //CREATE COOKIE DATA
                    cookie.set('user', {id,first_name,last_name,username,email,gender,phone_number,avatar} , {path:'/'})
                }
                

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
            avatar: objCookie.avatar
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
            const {id,first_name, last_name,username,email,gender,phone_number,avatar} = res.data
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
                    avatar: avatar
                }
            })

            cookie.set('user', {id,first_name,last_name,username,email,gender,phone_number,avatar} , {path:'/'})
        })
    }
}

//POST AVATAR TO USER
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
                const {id,first_name, last_name,username,email,gender,phone_number} = objUser
                
                console.log(res.data)   
                dispatch({
                    type:'PROFILE_PICTURE_UPLOADED',
                    payload:{
                        avatar: res.data
                    }
                })

                cookie.set('user', {id,first_name,last_name,username,email,gender,phone_number, avatar:res.data} , {path:'/'})

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
