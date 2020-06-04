import {fetch,services} from '../../requests'
import actionTypes from '../actionTypes'
import {message} from 'antd'

const startLogin = {
    type :actionTypes.START_LOGIN,
    playload:{
        isLoading:true
    }
}

const loginSuccess =(username,userid,roleid,groupid)=>{
    return({
    type:actionTypes.LOGIN_SUCCESS,
    playload:{
        userid,
        username,
        roleid,
        groupid,
        isLogin:true,
        isLoading:false,
        isShowErrmsg:false
    }
})}

export const loginFaild =()=>{
    window.localStorage.clear()
    window.sessionStorage.clear()
    return ({
        type:actionTypes.LOGIN_FAILD,
        playload:{
            isLoading:false,
            isShowErrmsg:true
        }
    })
}

export const loginFaildClose =()=>({
    type :actionTypes.LOGIN_FAILD_CLOSE,
    playload:{
        isShowErrmsg:false
    }
})

export const logout =()=>{
    window.localStorage.clear()
    window.sessionStorage.clear()
    return ({
        type:actionTypes.LOGIN_FAILD,
    })
}


export const requestLogin = (data)=>{
    return dispath =>{
        dispath(startLogin)
        return fetch.post('/login',data)
            .then((resp)=>{
                if (resp.data.code===200){
                    const {token,username,userid,roleid,groupid}= resp.data.data
                    if (data.remember){
                        window.localStorage.setItem('Token',token)
                        window.localStorage.setItem('Username',username)
                        window.localStorage.setItem('Userid',userid)
                        window.localStorage.setItem('roleid',roleid)
                        window.localStorage.setItem('groupid',groupid)
                    }else{
                        window.sessionStorage.setItem('Token',token)
                        window.sessionStorage.setItem('Username',username)
                        window.sessionStorage.setItem('Userid',userid)
                        window.sessionStorage.setItem('roleid',roleid)
                        window.sessionStorage.setItem('groupid',groupid)
                    }
                    dispath(loginSuccess(username,userid,roleid,groupid))
                }else{
                    dispath(loginFaild())
                }
            }).catch(()=>{
                dispath(loginFaild())
            })
    }
}


export const changepassword=(data) =>{
    return dispatch =>{
        services.post('/changepassword',data).then((resp)=>{
        // console.log('post-rep',resp)
        if (resp.code===200){
            dispatch(logout())
            message.success('修改成功')
        }else{
            message.error('密码错误,修改失败')
        }
    })
    }
}

export const login_changeState = (data) =>({
    type: actionTypes.LOGIN_CHANGESTATE,
    playload:{
        ...data
    }
})

export const register_postdata =(data) =>{
    return dispatch =>{
        services.post('/register',data).then((resp)=>{
            if (resp.code === 200){
                dispatch(login_changeState({reigister:true}))
            }else{
                dispatch(login_changeState({reigister:false}))
            }
        })
    }
}

export const register_getgroup = () =>{
    return dispatch =>{
        dispatch(login_changeState({ttesy:666}))
        services.get('/register/getGroup').then((resp)=>{
            dispatch(login_changeState({...resp.data}))
        })
    }
}