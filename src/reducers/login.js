import actionTypes from "../actionCreators/actionTypes";

const islogin = Boolean(window.localStorage.getItem('Token')) || Boolean(window.sessionStorage.getItem('Token'))
const username = window.localStorage.getItem('Username') || window.sessionStorage.getItem('Username')
const userid = window.localStorage.getItem('Userid') || window.sessionStorage.getItem('Userid')
const roleid = window.localStorage.getItem('roleid') || window.sessionStorage.getItem('roleid')
const groupid = window.localStorage.getItem('groupid') || window.sessionStorage.getItem('groupid')
const initState ={
    userid,
    username,
    roleid,
    groupid,
    isLogin:islogin,
    isLoading:false,
    isShowErrmsg:false,
    reigister:true,
    grouplist:[]
}

const emtryState={
    userid:null,
    username:'',
    isLogin:false,
    isLoading:false,
    isShowErrmsg:false,
}


export default (state=initState,actions)=>{
    switch (actions.type){
        case actionTypes.START_LOGIN:
            return {
                ...state,
                ...actions.playload
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...actions.playload,
            }
        case actionTypes.LOGIN_FAILD:
                return {
                    ...emtryState,
                    ...actions.playload,
                }
        case actionTypes.LOGIN_FAILD_CLOSE:
            return {
                ...emtryState,
                ...actions.playload,
            }
        case actionTypes.LOGOUT:
            return {
                ...emtryState,
            }
        case actionTypes.LOGIN_CHANGESTATE:
            return {
                ...state,
                ...actions.playload,
            }
        default:
            return state
    }
}


