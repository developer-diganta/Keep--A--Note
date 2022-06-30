export default function authReducer(state=null,action){
    switch(action.type){
        case "AUTH":
            localStorage.setItem('profile', JSON.stringify({...action.data}));
            state=JSON.stringify({...action.data});
            return state;
        case "LOGOUT":
            localStorage.setItem('profile',null);
            state=null
            return state
        default : 
            return state;
    }
};