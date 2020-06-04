import actionTypes from './actionTypes'
import {services} from '../requests'
import {message} from 'antd'

export const groupmember_getdata =(data)=>{
    return dispatch =>{
        services.post('/groupmember/getdata',data).then((resp)=>{
            dispatch({
                type:actionTypes.GROUPMEMBER_GETDATA,
                playload:{
                    ...resp.data
                }
            })
        })
    }
}

export const groupmember_postdata =(propsdata,data)=>{
    return dispatch =>{
        return services.post('/groupmember/postdata',data).then((resp)=>{
        // console.log('post-rep',resp)
        if (resp.code===200){
            dispatch(groupmember_getdata(propsdata))
            message.success('保存成功')
        }else{
            message.error('保存失败')
        }
    })
    }
}


export const groupmember_changeState =(data)=>({
    type:actionTypes.GROUPMEMBER_GETDATA,
    playload:{
        ...data
    }
})