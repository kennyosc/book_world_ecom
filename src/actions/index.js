import axios from '../config/axios.js'
import Swal from 'sweetalert2'

export const registerButton = (firstName,lastName,username,email,phoneNumber,password, passwordConfirmation) =>{
    if(password === passwordConfirmation){
        axios.post('/register',
            {
                first_name : firstName,
                last_name: lastName,
                username: username,
                email: email,
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
                    `User successfully submitted`,
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