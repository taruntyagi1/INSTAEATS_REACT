import { combineReducers } from "redux"
const initialstate = {
    cart : []
    
}
const userstate = {
    user:[
        
    ]
}



export const userreducer = (state = initialstate,action) =>{
    switch(action.type){
        case 'Add_cart':
            return {
                ...state,
                cart:[...state.cart,action.payload]
            }

        case 'Failure' :
            return{
                ...state,
            }
        default :
        return state;
    }
}

export const loginreducer = (state = userstate,action)=>{
    switch(action.type){
        case 'Login_success':
            return{
                ...state,
                user:[...state.user,action.payload]
            }
        case "clear_data":
            return{
                ...state,user : []
            }
        default:
            return state
    }
}

const rootreducer = combineReducers({cart: userreducer,user:loginreducer})

export default rootreducer;