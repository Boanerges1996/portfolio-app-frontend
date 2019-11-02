const USER_INFO = "USER_INFO"
const PERSONAL_INFO = "PERSONAL_INFO"
const UPDATE_PERSONAL_INFO= "UPDATE_PERSONAL_INFO"
const OCCUPATION_INFO = "OCCUPATION_INFO"
const CONTACT_INFO = "CONTACT_INFO"

const initialStore = {
    user_info:{
        "id":"1",
        "username":"Boanerges",
        "user_avatar":""
    },
    isAuthenticated:false,
    personalInfo:{
        exists:false
    },
    occupation:{
        exists:false
    },
    contact:{
        exists:false
    }
    
}

const rootRuducer = (state = initialStore,action)=>{
    if (action.type === USER_INFO){
        return {
            ...state,
            user_info:{
                ...state.user_info,
                ...action.info
            }
        }
    }
    else if(action.type===PERSONAL_INFO){
        return{
            ...state,
            personalInfo:{
                ...action.person
            }
        }
    }
    else if(action.type===UPDATE_PERSONAL_INFO){
        return {
            ...state,
            personalInfo:{
                ...action.data
            }
        }
    }
    else if(action.type===OCCUPATION_INFO){
        return {
            ...state,
            occupation:{
                ...action.data
            }
        }
    }
    else if(action.type===CONTACT_INFO){
        return {
            ...state,
            contact:{
                ...action.contacts
            }
        }
    }
    return state
}

export default rootRuducer;