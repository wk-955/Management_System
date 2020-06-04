import actionTypes from './actionTypes'
import {services} from '../requests'
import {message} from 'antd'
export const missionmanager_postpic =(data,missionid) =>{
    return dispatch =>{
    uploadfetch.post('/missionmanager/upload_pic',data).then((resp)=>{
        // console.log('post-rep',resp)
        if (resp.code===200){
            dispatch(missionmanager_getmissiondetail(missionid))
            message.success('操作成功')
            return true
        }else{
            message.error('操作失败')
            return false
        }
    })
    }
}

export const missionmanager_postfile =(data,missionid) =>{
    return dispatch =>{
    uploadfetch.post('/missionmanager/upload_file',data).then((resp)=>{
        // console.log('post-rep',resp)
        if (resp.code===200){
            dispatch(missionmanager_getmissiondetail(missionid))
            message.success('操作成功')
            return true
        }else{
            message.error('操作失败')
            return false
        }
    })
    }
}