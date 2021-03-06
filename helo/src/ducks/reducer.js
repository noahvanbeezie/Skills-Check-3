const initialState = {
    username:'',
    id:'',
    profilePic:''
}
const GET_USER = 'GET_USER'

export function getUser(userObj){
    return{
        type:GET_USER,
        payload:userObj
    }
}

export default function reducer(state = initialState,action){
    const {type,payload} = action
    switch(type){
        case GET_USER:
            return{...state, username:payload.username,id:payload.id,profilePic:payload.profilePic}
        default: 
            return state;
    }
}