import { combineReducers } from "redux";

const user_init ={
    first_name : '',
    last_name : '',
    username: '',
    email: '',
    gender: '',
    phone_number: '',
    password:'',
    avatar:''
}

const userReducer = (state = user_init, action) =>{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return{
                id: action.payload.id,
                username: action.payload.username,
                avatar: action.payload.avatar
            }
            break;
    
        default:
            return state
            break;
    }
}

export default combineReducers(
    {
        auth: userReducer
    }
)