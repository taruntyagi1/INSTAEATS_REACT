export const Add =(item)=>{
    return{
        type : 'Add_cart',
        payload : item
    }
}

export const Login_user =(user)=>{
    return{
        type: 'Login_success',
        payload: user
    }
}

