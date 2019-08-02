import { combineReducers } from "redux";

const user_init ={
    first_name : '',
    last_name : '',
    username: '',
    email: '',
    gender: '',
    phone_number: '',
    avatar:''
}

const userReducer = (state = user_init, action) =>{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                id: action.payload.id,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                username: action.payload.username,
                email: action.payload.email,
                gender: action.payload.gender,
                phone_number: action.payload.phone_number,
                avatar: action.payload.avatar
            }
            break;

        case 'LOGOUT_SUCCESS':
            return{
                ...state,
                id: '',
                username: '',
                avatar: ''
            }
            break;

        case 'PROFILE_UPDATE_SUCCESS':
            return{
                ...state,
                id: action.payload.id,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                username: action.payload.username,
                email: action.payload.email,
                gender:action.payload.gender,
                phone_number: action.payload.phone_number,
                avatar: action.payload.avatar
            }
            break;

        case 'PROFILE_PICTURE_UPLOADED':
            return{
                ...state,
                avatar : action.payload.avatar
            }
            
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